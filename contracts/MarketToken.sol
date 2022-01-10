// SPDX-License-Identifier: MIT



pragma solidity ^0.8.7;


import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/utils/Address.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";

contract MarketToken is ERC20, ReentrancyGuard{
    using Address for address;
    using SafeMath for uint256;
    using SafeERC20 for IERC20;
    IERC20 public rewardsToken;
    IERC20 public stakingToken;
    uint256 private _totalSupply;
    mapping(address => uint256) private _balances;
    mapping(address => uint256) private rewards;

     constructor(
       address _stakingToken,
       address _rewardsToken
    )  ERC20("FarmToken", "FRM") {
        
        stakingToken = IERC20(_stakingToken);
        rewardsToken = IERC20(_rewardsToken);
    }


    function totalSupply() public override view returns (uint256) {
        return _totalSupply;
    }

    function balanceOf(address account) public override view returns (uint256) {
        return _balances[account];
    } 

    function balance() public view returns (uint256) {
        return stakingToken.balanceOf(address(this));
    }


    function rewardEarned() public view returns (uint256) {
        return rewardsToken.balanceOf(msg.sender);
    }

    // Mutative Functions

    function stake(uint256 amount) public payable nonReentrant{
        require(amount > 0, "Cannot stake 0");
        _totalSupply = _totalSupply.add(amount);
        _balances[msg.sender] = _balances[msg.sender].add(amount);
        stakingToken.transferFrom(msg.sender, address(this), amount);
        rewards[msg.sender] = amount;
        emit Staked(msg.sender, amount);
    }

    function withdraw(uint256 amount) public nonReentrant  {
        require(amount > 0, "Cannot withdraw 0");
        _totalSupply = _totalSupply.sub(amount);
        _balances[msg.sender] = _balances[msg.sender].sub(amount);
        stakingToken.safeTransfer(msg.sender, amount);
        emit Withdrawn(msg.sender, amount);
    }

    function getReward(uint256 _amount) private nonReentrant {
            rewards[msg.sender] = rewards[msg.sender].sub(_amount);
            rewardsToken.safeTransfer(msg.sender, _amount);
            emit RewardDone(msg.sender, _amount);
    }

     function exit(uint256 _amount) external {
        withdraw(_amount);
        getReward(_amount);
    }
    

    // Events

    event RewardDone(address indexed user, uint256 amount);
    event Staked(address indexed user, uint256 amount);
    event Withdrawn(address indexed user, uint256 amount);
}
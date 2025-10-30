// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/access/AccessControl.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

/**
 * @title CarRegistry
 * @dev Manages digital identity and ownership of vehicles on blockchain
 */
contract CarRegistry is AccessControl {
    using Counters for Counters.Counter;

    bytes32 public constant MANUFACTURER_ROLE = keccak256("MANUFACTURER_ROLE");
    bytes32 public constant DEALER_ROLE = keccak256("DEALER_ROLE");
    bytes32 public constant SERVICE_PROVIDER_ROLE = keccak256("SERVICE_PROVIDER_ROLE");
    bytes32 public constant INSURANCE_ROLE = keccak256("INSURANCE_ROLE");
    bytes32 public constant RTO_ROLE = keccak256("RTO_ROLE");

    Counters.Counter private _carIdCounter;

    struct Car {
        uint256 carId;
        string vin;
        string make;
        string model;
        uint16 year;
        address manufacturer;
        address currentOwner;
        uint256 registrationDate;
        bool isActive;
    }

    struct OwnershipRecord {
        address owner;
        uint256 transferDate;
        string transferType; // "manufacture", "dealer", "customer", "resale"
    }

    mapping(uint256 => Car) public cars;
    mapping(string => uint256) public vinToCar; // VIN to Car ID mapping
    mapping(uint256 => OwnershipRecord[]) public ownershipHistory;
    mapping(address => uint256[]) public userCars;

    event CarRegistered(uint256 indexed carId, string vin, address indexed manufacturer);
    event OwnershipTransferred(uint256 indexed carId, address indexed from, address indexed to, string transferType);
    event CarDeactivated(uint256 indexed carId);

    constructor() {
        _grantRole(DEFAULT_ADMIN_ROLE, msg.sender);
    }

    /**
     * @dev Register a new car with unique VIN
     */
    function registerCar(
        string memory _vin,
        string memory _make,
        string memory _model,
        uint16 _year
    ) external onlyRole(MANUFACTURER_ROLE) returns (uint256) {
        require(vinToCar[_vin] == 0, "VIN already registered");

        _carIdCounter.increment();
        uint256 carId = _carIdCounter.current();

        cars[carId] = Car({
            carId: carId,
            vin: _vin,
            make: _make,
            model: _model,
            year: _year,
            manufacturer: msg.sender,
            currentOwner: msg.sender,
            registrationDate: block.timestamp,
            isActive: true
        });

        vinToCar[_vin] = carId;
        userCars[msg.sender].push(carId);

        ownershipHistory[carId].push(OwnershipRecord({
            owner: msg.sender,
            transferDate: block.timestamp,
            transferType: "manufacture"
        }));

        emit CarRegistered(carId, _vin, msg.sender);
        return carId;
    }

    /**
     * @dev Transfer car ownership
     */
    function transferOwnership(
        uint256 _carId,
        address _newOwner,
        string memory _transferType
    ) external {
        require(cars[_carId].isActive, "Car is not active");
        require(cars[_carId].currentOwner == msg.sender, "Only current owner can transfer");
        require(_newOwner != address(0), "Invalid new owner");

        address previousOwner = cars[_carId].currentOwner;
        cars[_carId].currentOwner = _newOwner;

        userCars[_newOwner].push(_carId);

        ownershipHistory[_carId].push(OwnershipRecord({
            owner: _newOwner,
            transferDate: block.timestamp,
            transferType: _transferType
        }));

        emit OwnershipTransferred(_carId, previousOwner, _newOwner, _transferType);
    }

    /**
     * @dev Get car details
     */
    function getCar(uint256 _carId) external view returns (Car memory) {
        require(cars[_carId].isActive, "Car not found");
        return cars[_carId];
    }

    /**
     * @dev Get ownership history
     */
    function getOwnershipHistory(uint256 _carId) external view returns (OwnershipRecord[] memory) {
        return ownershipHistory[_carId];
    }

    /**
     * @dev Get cars owned by user
     */
    function getUserCars(address _user) external view returns (uint256[] memory) {
        return userCars[_user];
    }

    /**
     * @dev Get car ID by VIN
     */
    function getCarByVin(string memory _vin) external view returns (uint256) {
        return vinToCar[_vin];
    }
}

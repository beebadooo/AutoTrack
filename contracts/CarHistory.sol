// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/access/AccessControl.sol";

/**
 * @title CarHistory
 * @dev Immutable ledger of all car events (damage, service, insurance, etc.)
 */
contract CarHistory is AccessControl {
    bytes32 public constant RECORDER_ROLE = keccak256("RECORDER_ROLE");

    enum EventType {
        DAMAGE,
        SERVICE,
        INSURANCE_CLAIM,
        POLLUTION_CHECK,
        CHALLAN,
        RECALL,
        ACCIDENT,
        MAINTENANCE,
        INSPECTION
    }

    struct HistoryEvent {
        uint256 carId;
        EventType eventType;
        address recordedBy;
        uint256 timestamp;
        string description;
        string documentHash; // IPFS hash for proof
        bool verified;
    }

    mapping(uint256 => HistoryEvent[]) public carHistory;
    mapping(uint256 => uint256) public eventCount;

    event EventRecorded(uint256 indexed carId, EventType eventType, address indexed recordedBy, uint256 timestamp);
    event EventVerified(uint256 indexed carId, uint256 eventIndex);

    constructor() {
        _grantRole(DEFAULT_ADMIN_ROLE, msg.sender);
    }

    /**
     * @dev Record a new event in car history
     */
    function recordEvent(
        uint256 _carId,
        EventType _eventType,
        string memory _description,
        string memory _documentHash
    ) external onlyRole(RECORDER_ROLE) {
        HistoryEvent memory newEvent = HistoryEvent({
            carId: _carId,
            eventType: _eventType,
            recordedBy: msg.sender,
            timestamp: block.timestamp,
            description: _description,
            documentHash: _documentHash,
            verified: false
        });

        carHistory[_carId].push(newEvent);
        eventCount[_carId]++;

        emit EventRecorded(_carId, _eventType, msg.sender, block.timestamp);
    }

    /**
     * @dev Verify an event (by authorized party)
     */
    function verifyEvent(uint256 _carId, uint256 _eventIndex) external onlyRole(RECORDER_ROLE) {
        require(_eventIndex < carHistory[_carId].length, "Event not found");
        carHistory[_carId][_eventIndex].verified = true;
        emit EventVerified(_carId, _eventIndex);
    }

    /**
     * @dev Get all events for a car
     */
    function getCarHistory(uint256 _carId) external view returns (HistoryEvent[] memory) {
        return carHistory[_carId];
    }

    /**
     * @dev Get specific event
     */
    function getEvent(uint256 _carId, uint256 _eventIndex) external view returns (HistoryEvent memory) {
        require(_eventIndex < carHistory[_carId].length, "Event not found");
        return carHistory[_carId][_eventIndex];
    }

    /**
     * @dev Get event count for a car
     */
    function getEventCount(uint256 _carId) external view returns (uint256) {
        return eventCount[_carId];
    }
}

pragma solidity  0.5.11;

import "./arrayops.sol";


contract TodoLists {

    struct Todo {
        uint id;
        address owner;
        string description;
        uint created;
        uint finished;
    }

    uint private todoIdValue;

    mapping(address => uint[]) public ownerIndex;
    mapping(uint => Todo) public todos;

    constructor() public {}

    function createItem(string calldata description) external {
        todoIdValue = todoIdValue++;
        todos[todoIdValue] = Todo(
            todoIdValue,
            msg.sender,
            description,
            block.timestamp,
            0
        );
        ownerIndex[msg.sender].push(todoIdValue);
    }

    function updateItemFinishItem(uint todoIdIn) external {
        Todo storage todo = todos[todoIdIn];
        require(todo.owner == msg.sender, "Sender of todo needs to be owner");
        require(todo.finished == 0, "todo cannot be finished");
        todo.finished = block.timestamp;
    }

    function deleteItem(uint todoIdIn)  external {
        Todo storage todo = todos[todoIdIn];
        require(todo.owner == msg.sender, "Sender of todo needs to be owner");
        delete todos[todoIdIn];
        uint[] storage indexArray = ownerIndex[msg.sender];
        ArrayOps.deleteFromIndex(indexArray, todoIdIn);
        ownerIndex[msg.sender] = indexArray;
    }

    function requestItemList() external view returns (uint[] memory todoIds) {
        todoIds = ownerIndex[msg.sender];
    }

    function requestItemSingle(uint todoIdIn) external view returns(
        uint todoId,
        address owner,
        string memory description,
        uint created,
        uint finished
    ) {
        Todo memory todo = todos[todoIdIn];
        todoId = todo.id;
        owner = todo.owner;
        description = todo.description;
        created = todo.created;
        finished = todo.finished;
    }

}

// SPDX-License-Identifier: MIT
pragma solidity 0.8.28;

contract SimpleStorage {
    mapping(string => uint256) public NameToAge;

    struct People {
        string name;
        uint256 age;
    }

    People[] public people;
    uint256 favNum;

    function store(uint256 _favNum) public virtual {
        favNum = _favNum;
    }

    function retrieve() public view returns (uint256) {
        return favNum;
    }

    function addPeople(string memory _name, uint256 _age) public {
        people.push(People(_name, _age));

        NameToAge[_name] = _age;
    }
}

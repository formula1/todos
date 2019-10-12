pragma solidity  0.5.12;


library ArrayOps {

    function binarySearch(uint[] storage sortedArray, uint key) internal view returns (
        uint index
    ) {
        uint low = 0;
        uint high = sortedArray.length - 1;
        index = sortedArray.length;

        while (low <= high) {
            uint mid = (low + high) / 2;
            if (sortedArray[mid] < key) {
                low = mid + 1;
            } else if (sortedArray[mid] > key) {
                high = mid - 1;
            } else if (sortedArray[mid] == key) {
                index = mid;
                break;
            }
        }
        return index;
    }

    function deleteFromIndex(uint[] storage sortedArray, uint indexVal) internal {
        if (indexVal == sortedArray[sortedArray.length - 1]) {
            delete sortedArray[sortedArray.length-1];
            sortedArray.length--;
            return;
        }
        require(indexVal < sortedArray[sortedArray.length - 1], "Index Value not found");
        uint i = binarySearch(sortedArray, indexVal);
        require(i < sortedArray.length, "Index Value not found");

        for (0; i < sortedArray.length-1; i++) {
            sortedArray[i] = sortedArray[i+1];
        }
        delete sortedArray[sortedArray.length-1];
        sortedArray.length--;
    }
}

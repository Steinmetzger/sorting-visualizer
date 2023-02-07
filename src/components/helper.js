/**
 * Sets a timeout for a given time.
 *
 * @param {number} time - Sleep time in milliseconds.
 * @returns {Promise} 
 */
export function sleep(time) {
    return new Promise(
        resolve => {
            setTimeout(() => {
                resolve()
            }, time)
        }
    )
}

/**
 * Swaps two items in a given Array.
 *
 * @param {number[]} items - The array to sort.
 * @param {number} leftIndex - Index of the left item.
 * @param {number} rightIndex - Index of the right item.
 * @returns {number[]} Sorted array.
 */
 export function swapItem(items, leftIndex, rightIndex) {
    // save left item
    const leftItem = items[leftIndex]

    // set left item to right item
    items[leftIndex] = items[rightIndex]

    // set right item to left item
    items[rightIndex] = leftItem

    return items
}
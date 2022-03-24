const MILLISECONDS_PER_SECOND = 1000
const MILLISECONDS_PER_MINUTE = 60 * MILLISECONDS_PER_SECOND
const MILLISECONDS_PER_HOUR = 60 * MILLISECONDS_PER_MINUTE
const MILLISECONDS_PER_DAY = 24 * MILLISECONDS_PER_HOUR
const NEXT_POWERBALL_DRAW_DATE = new Date(2022, 2, 26, 20, 0, 0, 0 )
const NEXT_MEGAMILLIONS_DRAW_DATE = new Date(2022, 2, 25, 20, 0, 0, 0 )

const LAST_50_POWERBALL_DRAWINGS = [[31,32,37,38,48,24],
    [1,15,26,63,65,16],
    [8,9,18,40,52,6],
    [3,28,34,35,58,17],
    [21,28,32,44,49,6],
    [19,20,37,39,61,8],
    [13,22,34,51,67,10],
    [10,43,55,59,67,2],
    [8,23,37,52,65,13],
    [1,7,10,32,56,13],
    [19,37,48,61,63,12],
    [7,21,39,47,55,19],
    [15,32,36,48,64,19],
    [6,17,21,35,64,18],
    [2,36,37,45,69,3],
    [3,10,15,33,42,11],
    [22,30,40,42,48,16],
    [16,25,27,49,55,17],
    [8,10,21,41,62,7],
    [2,17,33,51,63,26],
    [5,15,38,47,65,10],
    [5,16,27,39,61,24],
    [18,29,33,62,63,15],
    [10,15,51,61,69,14],
    [2,15,36,54,65,11],
    [4,11,38,49,69,16],
    [11,29,30,47,53,16],
    [8,14,33,36,67,17],
    [11,15,43,55,61,10],
    [9,24,35,46,65,22],
    [3,18,37,51,59,13],
    [12,21,22,30,33,24],
    [14,17,18,21,27,9],
    [20,21,36,60,65,13],
    [6,14,25,33,46,17],
    [2,13,32,33,48,22],
    [6,12,39,48,50,7],
    [2,6,9,33,39,11],
    [36,38,45,62,64,19],
    [27,29,45,55,58,2],
    [7,16,19,48,68,15],
    [2,13,23,34,66,2],
    [2,6,24,41,61,1],
    [19,20,40,42,59,15],
    [10,30,37,53,59,4],
    [3,25,44,53,64,10],
    [3,7,33,50,69,24],
    [3,21,38,50,59,6],
    [10,40,45,56,67,2],
    [12,15,38,57,63,26]];

const LAST_50_MEGAMILLIONS_DRAWINGS = [[8,15,21,27,61,8],
    [2,6,25,40,45,5],
    [9,14,28,49,60,24],
    [24,28,39,44,66,25],
    [7,18,38,58,64,24],
    [2,25,32,33,50,12],
    [11,19,28,46,47,5],
    [18,22,38,39,50,18],
    [15,31,40,56,66,4],
    [6,17,22,57,62,3],
    [6,11,50,63,68,17],
    [2,4,15,21,63,19],
    [11,16,23,24,30,24],
    [1,17,20,52,54,2],
    [7,16,34,44,61,24],
    [11,24,38,62,66,14],
    [3,16,25,44,55,13],
    [3,12,38,53,58,13],
    [38,45,46,55,67,18],
    [4,19,39,42,52,9],
    [5,8,13,22,48,25],
    [2,3,19,52,58,16],
    [7,29,43,56,57,6],
    [4,6,16,21,22,1],
    [2,5,30,46,61,8],
    [3,5,8,31,38,4],
    [16,17,25,36,37,16],
    [25,31,58,64,67,24],
    [21,32,38,48,62,10],
    [33,35,44,55,69,20],
    [23,25,40,42,60,8],
    [1,7,40,43,68,1],
    [22,45,48,58,61,13],
    [7,8,26,30,39,17],
    [7,27,37,42,59,2],
    [7,24,54,57,58,6],
    [5,23,52,53,59,18],
    [6,22,44,53,65,3],
    [30,32,42,46,48,15],
    [9,14,16,26,49,14],
    [10,15,20,66,68,18],
    [5,10,26,58,65,9],
    [15,26,28,35,45,4],
    [6,14,19,56,62,9],
    [9,14,26,29,66,22],
    [3,12,13,19,52,1],
    [3,20,31,34,65,18],
    [21,26,56,61,65,4],
    [21,24,36,40,70,22],
    [7,11,18,30,36,4]];

const shiftSubArrayRight = (arr, startIndex, shiftAmount) =>
{
    let arrLen = arr.length
    for (let i = arrLen - 1; i >= startIndex + shiftAmount; i--)
    {
        arr[i] = arr[i - shiftAmount]
    }
    return arr
}

class CountDown
{
    constructor(daysLeft, hoursLeft, minutesLeft, secondsLeft, isExpired)
    {
        this.daysLeft = daysLeft
        this.hoursLeft = hoursLeft
        this.minutesLeft = minutesLeft
        this.secondsLeft = secondsLeft
        this.isExpired = isExpired;
    }

    static getCountDown(currentDate, targetDate)
    {
        let countDown = null
        let currentDateMillis = currentDate.getTime()
        let targetDateMillis = targetDate.getTime()
        if (targetDateMillis <= currentDateMillis)
        {
            countDown = new CountDown(0, 0, 0, 0, true)
        }
        else
        {
            let millisLeft = targetDateMillis - currentDateMillis
            let daysLeft = Math.floor(millisLeft / MILLISECONDS_PER_DAY)
            let hoursLeft = Math.floor((millisLeft % MILLISECONDS_PER_DAY) / MILLISECONDS_PER_HOUR)
            let minutesLeft = Math.floor((millisLeft % MILLISECONDS_PER_HOUR) / MILLISECONDS_PER_MINUTE)
            let secondsLeft = Math.floor((millisLeft % MILLISECONDS_PER_MINUTE) / MILLISECONDS_PER_SECOND)
            countDown = new CountDown(daysLeft, hoursLeft, minutesLeft, secondsLeft, false)
        }
        return countDown
    }
}

class LotteryGame
{

    constructor (name, maxMainBall, maxBonusBall, bonusBallName)
    {
        this.name = name
        this.maxMainBall = maxMainBall
        this.maxBonusBall = maxBonusBall
        this.bonusBallName = bonusBallName
    }

    static getMostFrequentMainBalls(recentDrawings)
    {
        const freqMap = {}
        const mostFrequentBalls = [0, 0, 0, 0, 0]
        const highestFrequencies = [0, 0, 0, 0, 0]
        const frequencies = new Array(70)
        for (let k = 0; k < 70; k++)
        {
            frequencies[k] = [k + 1, 0]
        }

        for(let i = 0; i < recentDrawings.length; i++)
        {
            for (let j = 0; j < 5; j++)
            {
                frequencies[recentDrawings[i][j] - 1][1] += 1
            }

        }
        frequencies.sort((a, b) =>
                         {
                             return b[1] - a[1]
                         })

        for (let m = 0; m < mostFrequentBalls.length; m++)
        {
            mostFrequentBalls[m] = frequencies[m][0]
        }
        return mostFrequentBalls
    }

    static getMostFrequentBonusBalls(recentDrawings)
    {
        const bonusBallIndex = 5
        const freqMap = {}
        const mostFrequentBalls = [0, 0, 0, 0, 0]
        const highestFrequencies = [0, 0, 0, 0, 0]
        const frequencies = new Array(26)
        for (let k = 0; k < 26; k++)
        {
            frequencies[k] = [k + 1, 0]
        }
        for(let i = 0; i < recentDrawings.length; i++)
        {
            frequencies[recentDrawings[i][5] - 1][1] += 1
        }
        frequencies.sort((a, b) =>
                         {
                             return b[1] - a[1]
                         })

        for (let m = 0; m < mostFrequentBalls.length; m++)
        {
            mostFrequentBalls[m] = frequencies[m][0]
        }
        return mostFrequentBalls
    }

    static getFrequencyIndex(freq, freqArray)
    {
        let freqIndex = -1
        let i = freqArray.length - 1
        while (freq >= freqArray[i] && i >= 0)
        {
            freqIndex = i
            i--
        }
        return freqIndex
    }

    static getPositionAverages(previousDrawings)
    {
        let averages = [0,0,0,0,0,0]
        for (let i = 0; i < previousDrawings.length; i++)
        {
            for (let j = 0; j < previousDrawings[i].length; j++)
            {
                averages[j] += previousDrawings[i][j]
            }
        }
        for (let k = 0; k < averages.length; k++)
        {
            averages[k] = Math.round(averages[k] / previousDrawings.length)
        }
        return averages;
    }

    static getPositionMedians(previousDrawings)
    {
        let numDrawings = previousDrawings.length
        let numPositions = previousDrawings[0].length
        let midPoint = Math.floor(numDrawings / 2)
        let medians = [0,0,0,0,0,0]
        let columns = new Array(numPositions)
        for (let i = 0; i < numPositions; i++)
        {
            columns[i] = new Array(numDrawings)
        }
        for (let j = 0; j < numDrawings; j++)
        {
            for (let k = 0; k < numPositions; k++)
            {
                columns[k][j] = previousDrawings[j][k]
            }
        }
        for (let m = 0; m < numPositions; m++)
        {
            columns[m].sort((a, b) =>
                            { return a - b})

            if (numDrawings % 2 === 0)
            {
                medians[m] = Math.round((columns[m][midPoint - 1] + columns[m][midPoint]) / 2)
            }
            else
            {
                medians[m] = columns[m][midPoint]
            }
        }
        return medians
    }
}


class GamePLay
{
    constructor(game, ballArray, bonusBall)
    {
        this.game = game
        this.ballArray = ballArray
        this.bonusBall = bonusBall
    }
}
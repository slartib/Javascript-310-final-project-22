describe('getCountdown', () =>
{
  it ("returns a new countdown instance 1 day apart", () =>
  {
    let countDown = CountDown.getCountDown(new Date(2022, 2, 21, 19, 0, 0, 0),
                                           new Date(2022, 2, 22, 19, 0, 0, 0));
    expect(countDown.daysLeft).toBe(1);
    expect(countDown.hoursLeft).toBe(0);
    expect(countDown.minutesLeft).toBe(0)
    expect(countDown.secondsLeft).toBe(0)
    expect(countDown.isExpired).toBe(false)
  })
})

describe('getCountdown 2', () =>
{
  it ("returns a new countdown instance 1 day, 2 hours, 15 minutes and 20 seconds apart", () =>
  {
    let countDown = CountDown.getCountDown(new Date(2022, 2, 21, 17, 0, 0, 0),
                                           new Date(2022, 2, 22, 19, 15, 20, 0));
    expect(countDown.daysLeft).toBe(1);
    expect(countDown.hoursLeft).toBe(2);
    expect(countDown.minutesLeft).toBe(15)
    expect(countDown.secondsLeft).toBe(20)
    expect(countDown.isExpired).toBe(false)
  })
})

describe('getCountdown is expired', () =>
{
  it ("returns a new countdown instance", () =>
  {
    let countDown = CountDown.getCountDown(new Date(2022, 2, 22, 19, 0, 0, 0),
                                           new Date(2022, 2, 21, 19, 0, 0, 0));
    expect(countDown.daysLeft).toBe(0);
    expect(countDown.hoursLeft).toBe(0);
    expect(countDown.minutesLeft).toBe(0)
    expect(countDown.secondsLeft).toBe(0)
    expect(countDown.isExpired).toBe(true)
  })
})

describe('getCountdown is expired 2', () =>
{
  it ("returns a new countdown instance", () =>
  {
    let countDown = CountDown.getCountDown(new Date(2022, 2, 22, 19, 0, 0, 0),
                                           new Date(2022, 2, 22, 19, 0, 0, 0));
    expect(countDown.daysLeft).toBe(0);
    expect(countDown.hoursLeft).toBe(0);
    expect(countDown.minutesLeft).toBe(0)
    expect(countDown.secondsLeft).toBe(0)
    expect(countDown.isExpired).toBe(true)
  })
})

describe("shift subarray right", () =>
{
  it ("checks that the subarray was shifted right by the appropriate amount", () =>
  {
    let result = shiftSubArrayRight([1, 2, 3, 4, 5], 1, 1)
    expect(result).toEqual([1, 2, 2, 3, 4])
  })

})

describe("shift subarray right 2", () =>
{
  it ("checks that the subarray was shifted right by the appropriate amount", () =>
  {
    let result = shiftSubArrayRight([1, 2, 3, 4, 5], 0, 2)
    expect(result).toEqual([1, 2, 1, 2, 3])
  })

})

describe("get frequency index - first index", () =>
{
  it ("returns the index that should contain the new frequency ", () =>
  {
    let freqIndex = LotteryGame.getFrequencyIndex(3, [2, 1, 1, 1, 1, 0])
    expect(freqIndex).toBe(0)
  })
})

describe("get frequency index - not first index", () =>
{
  it ("returns the index that should contain the new frequency ", () =>
  {
    let freqIndex = LotteryGame.getFrequencyIndex(2, [2, 1, 1, 1, 1, 0])
    expect(freqIndex).toBe(0)
  })
})

describe("get frequency index, none exist", () =>
{
  it ("returns the index that should contain the new frequency ", () =>
  {
    let freqIndex = LotteryGame.getFrequencyIndex(3, [5, 4, 4, 4, 4])
    expect(freqIndex).toBe(-1)
  })
})
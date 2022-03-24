let powerBallGame = new LotteryGame("Powerball", 69, 26, "Power Ball")
let megamillionsGame = new LotteryGame("Mega Millions", 70, 25, "Mega Ball")


let powerballCountDownTimer = setInterval(() =>
{
  let powerballCountDownEl = document.getElementById('powerball_countdown');
  let countDown = CountDown.getCountDown(new Date(), NEXT_POWERBALL_DRAW_DATE )
  if (!countDown.isExpired)
  {
    powerballCountDownEl.innerText = `${countDown.daysLeft} days ${countDown.hoursLeft} hours ${countDown.minutesLeft} minutes ${countDown.secondsLeft}`
  }
  else
  {
    clearInterval(powerballCountDownTimer)
    powerballCountDownEl.innerText = 'Time passed'
  }

}, 1000);

let megamillionsCountDownTimer = setInterval(() =>
{
  let megamillionsCountDownEl = document.getElementById('megamillions_countdown');
  let countDown = CountDown.getCountDown(new Date(), NEXT_MEGAMILLIONS_DRAW_DATE )
  if (!countDown.isExpired)
  {
    megamillionsCountDownEl.innerText = `${countDown.daysLeft} days ${countDown.hoursLeft} hours ${countDown.minutesLeft} minutes ${countDown.secondsLeft}`
  }
  else
  {
    clearInterval(megamillionsCountDownTimer)
    megamillionsCountDownEl.innerText = 'Time passed'
  }

}, 1000);


const populatePlayTable = (fetchReturn, tableEl) =>
{
  console.log(fetchReturn)
  let playRows = Array.from(tableEl.getElementsByClassName("playRow"))
  for (let i = 0; i < playRows.length; i++)
  {
    playRows[i].parentNode.removeChild(playRows[i])
  }
  for (let j = 0; j < fetchReturn.length; j++)
  {
    let rowEl = document.createElement('tr')
    rowEl.classList.add('playRow')
    for (let m = 0; m <  fetchReturn[j].ballArray.length; m++)
    {
      let detailEl = document.createElement('td')
      detailEl.innerText = fetchReturn[j].ballArray[m]
      detailEl.classList.add("center")
      rowEl.appendChild(detailEl)
    }
    let detailEl2 = document.createElement('td')
    detailEl2.innerText = fetchReturn[j].bonusBall
    detailEl2.classList.add("center")
    rowEl.appendChild(detailEl2)

    tableEl.appendChild(rowEl)
  }
}

const pbFetchHandler = (fetchReturn) =>
{
  console.log(fetchReturn)
  let pbPlaysTabEl = document.getElementById('pbPlaysTab')
  populatePlayTable(fetchReturn, pbPlaysTabEl)
}

const mmFetchHandler = (fetchReturn) =>
{
  console.log(fetchReturn)
  let mmPlaysTabEl = document.getElementById('mmPlaysTab')
  populatePlayTable(fetchReturn, mmPlaysTabEl)
}

//const baseUrl = 'http://Lotteryrest-env.eba-e8eu5p5f.us-west-2.elasticbeanstalk.com/'
//const powerballEndpoint = 'powerball'
//const megamillionsEndpoint = 'megamillions'
//const baseQueryString = '?num_plays='

const fetchPlays = (game, numPlays) =>
{
  const baseUrl = 'http://Lotteryrest-env.eba-e8eu5p5f.us-west-2.elasticbeanstalk.com/'
  //const baseUrl = 'http://localhost:8080/'
  const powerballEndpoint = 'powerball'
  const megamillionsEndpoint = 'megamillions'
  const baseQueryString = '?numplays='

  let gamePlayUrl = `${baseUrl}${game}${baseQueryString}${numPlays}`
  console.log(gamePlayUrl)
  let fetchHandler
  if (game === powerballEndpoint)
  {
    fetchHandler = pbFetchHandler
  }
  else if (game === megamillionsEndpoint)
  {
    fetchHandler = mmFetchHandler
  }

  fetch(gamePlayUrl).then((data) =>
                 {
                   console.log(data)
                   return data.json()
                 }).then(fetchHandler).catch((reason) => {console.log(reason)} )

  //let result = fetch(gamePlayUrl).then(fetchHandler).catch((reason) => {console.log(reason)} )

  //console.log(result)
}


let pbFormEl = document.getElementById('pbnum-plays')
let mmFormEl = document.getElementById('mmnum-plays')

pbFormEl.addEventListener('submit', (e) =>
{
  e.preventDefault()
  let numEl = document.getElementById('pbnumber')
  let value = numEl.valueAsNumber
  if (value > 0 && value <= 30)
  {
    fetchPlays('powerball', value)
    numEl.value = ''
  }
  else
  {
    alert('The number of PowerBall plays requested should be between 1 and 30')
  }

})

mmFormEl.addEventListener('submit', (e) =>
{
  e.preventDefault()
  let numEl = document.getElementById('mmnumber')
  let value = numEl.valueAsNumber
  if (value > 0 && value <= 30)
  {
    fetchPlays('megamillions', value)
    numEl.value = ''
  }
  else
  {
    alert('The number of Megamillions plays requested should be between 1 and 30')
  }
})

const addTableRowFromArray = (tableEl, data) =>
{
  let rowEl = document.createElement('tr')

  for (let i = 0; i <  data.length; i++)
  {
    let detailEl = document.createElement('td')
    detailEl.innerText = data[i]
    detailEl.classList.add("center")
    rowEl.appendChild(detailEl)
  }
  tableEl.appendChild(rowEl)
}

const populateStatsTables = (idPrefix) =>
{
  let freqBallsTable = document.getElementById(`${idPrefix}-most-freq-balls`)
  let freqBonusBallsTable = document.getElementById(`${idPrefix}-most-freq-bonusballs`)
  let avgByPosTable = document.getElementById(`${idPrefix}-avg-by-pos`)
  let medByPosTable = document.getElementById(`${idPrefix}-median-by-pos`)
  let recentDrawingsTable = document.getElementById(`${idPrefix}-recent`)

  let recentDrawings = LAST_50_POWERBALL_DRAWINGS
  if (idPrefix === 'mm')
  {
    recentDrawings = LAST_50_MEGAMILLIONS_DRAWINGS
  }

  addTableRowFromArray(freqBallsTable, LotteryGame.getMostFrequentMainBalls(recentDrawings))
  addTableRowFromArray(freqBonusBallsTable, LotteryGame.getMostFrequentBonusBalls(recentDrawings))
  addTableRowFromArray(avgByPosTable, LotteryGame.getPositionAverages(recentDrawings))
  addTableRowFromArray(medByPosTable, LotteryGame.getPositionMedians(recentDrawings))
  for (let i = 0; i < recentDrawings.length; i++)
  {
    addTableRowFromArray(recentDrawingsTable, recentDrawings[i])
  }
}

window.addEventListener('load', (e) =>
{
  populateStatsTables('pb')
  populateStatsTables('mm')
})

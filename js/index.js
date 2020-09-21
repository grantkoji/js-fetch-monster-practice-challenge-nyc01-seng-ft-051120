// json-server monsters.json




document.addEventListener('DOMContentLoaded', function() {

    const monsterContainerDiv = document.querySelector('#monster-container')
    let currentPage = 1
    fetchMonsters(`http://localhost:3000/monsters/?_limit=50&_page=${currentPage}`)
    formMonsterSubmit()
    renderMonsterPages()


    function fetchMonsters(url) {
        fetch(url)
        .then(resp => resp.json())
        .then(data => {
            const monstersInfo = renderMonsters(data)
                        // - When the page loads, show the first 50 monsters. Each monster's name, age, and
                        //   description should be shown.
                        //get request. pull first 50 monsters
                      
            
            monsterContainerDiv.innerHTML = monstersInfo.join('')
        })
        .catch(error => alert(error))
    }


    function renderMonsters(monstersData) {
        return monstersData.map(monsterData => {
            return `
            <div class="monster-info">
                <h3>${monsterData.name}</h3>
                <h4>${monsterData.age}</h4>
                <p>${monsterData.description}</p>
            </div>
            `
        })
    }


  function renderMonsterPages() {
    document.addEventListener('click', function(e){
        const currentButton = e.target
        if (currentButton.id === "back") {
            if (currentPage === 1) {
                alert('You are currently on the first page!')
            }
            else {
                currentPage = currentPage - 1
                fetchMonsters(`http://localhost:3000/monsters/?_limit=50&_page=${currentPage}`)
            }
        }

        else if (currentButton.id === "forward") {
            currentPage = currentPage + 1
            fetchMonsters(`http://localhost:3000/monsters/?_limit=50&_page=${currentPage}`)
        }
    })
  }


   



   

  


})
// `<form action="http://localhost:3000/monsters/" method: "POST">

function formMonsterSubmit() {
    let formMonster = document.createElement('div')
    formMonster.id = 'submit-monster'
    formMonster.innerHTML = `<form>
                                <label for="name">Monster Name:</label>
                                <input type="text" id="monster-name" name="name">
                                <label for="age">Monster Age:</label>
                                <input type="number" id="monster-number" name="age"><br>
                                <label for="description">Monster Description:</label><br>
                                <input type="text" id="monster-description" name="description"><br>
                                <button type="submit" value="Submit">Submit</button>
                            </form>`
    const submitDiv = document.querySelector('#create-monster')
    submitDiv.append(formMonster)

    document.querySelector('form').addEventListener('submit', function(e){
        e.preventDefault()
        const formInput = e.target
        const inputName = formInput.name.value
        // const inputName = document.querySelector('form').querySelector('input')
        const inputAge = formInput.age.value 
        const inputDesc = formInput.description.value 
        // console.log(formInput.name.value)
        fetchPost(inputName, inputAge, inputDesc)
        formInput.reset()
    })
}

function fetchPost(name, age, desc) {
    const thisMonster = {
        name: `${name}`,
        age: `${age}`,
        description: `${desc}`
    }
    fetch('http://localhost:3000/monsters/', {
        method: 'POST',
        headers: {
            'Content-type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify(thisMonster)
    })
}
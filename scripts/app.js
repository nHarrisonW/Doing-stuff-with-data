

async function displayPeopleSortedBy(sortType, numPeople) {
    const response = await fetch('../data/data.json');
    const data = await response.json();
    const people = data.People;
  
    // Sort the people array by the given sort type
    switch (sortType) {
      case 'age':
        people.sort((a, b) => a.Age - b.Age);
        break;
      case 'height':
        people.sort((a, b) => parseInt(a.Height) - parseInt(b.Height));
        break;
      case 'email':
        people.sort((a, b) => {
          if (a.Email < b.Email) return -1;
          if (a.Email > b.Email) return 1;
          return 0;
        });
        break;
      case 'lastname':
        people.sort((a, b) => {
          if (a.LastName < b.LastName) return -1;
          if (a.LastName > b.LastName) return 1;
          return 0;
        });
        break;
        case 'firstname':
    people.sort((a, b) => {
      if (a.FirstName < b.FirstName) return -1;
      if (a.FirstName > b.FirstName) return 1;
      return 0;
    });
    break;
      default:
        people.sort((a, b) => a.Id - b.Id);
        break;
    }
  
    // Get the specified number of people from the sorted list
    const numPeopleToShow = Math.min(numPeople, people.length);
    const peopleToShow = people.slice(0, numPeopleToShow);
  
    // Create an HTML table and fill it with the people's data
    const table = document.createElement('table');
    const thead = table.createTHead();
    const row = thead.insertRow();
    const headers = ['Name', 'Email', 'Height', 'Age'];
    for (const header of headers) {
      const th = document.createElement('th');
      const text = document.createTextNode(header);
      th.appendChild(text);
      row.appendChild(th);
    }
    const tbody = table.createTBody();
    for (const person of peopleToShow) {
      const row = tbody.insertRow();
      const nameCell = row.insertCell();
      nameCell.innerHTML = `${person.FirstName} ${person.LastName}`;
      const emailCell = row.insertCell();
      emailCell.textContent = person.Email;
      const heightCell = row.insertCell();
      heightCell.textContent = person.Height;
      const ageCell = row.insertCell();
      ageCell.textContent = person.Age;
    }
  
    // Remove the previous table from the DOM
    const container = document.getElementById('table-container');
    container.innerHTML = '';
  
    // Append the new table to the DOM
    container.appendChild(table);
  
    // Create a dropdown menu to select the number of people to display
    const dropdown = document.createElement('select');
    dropdown.addEventListener('change', () => {
      const numPeople = parseInt(dropdown.value);
      displayPeopleSortedBy(sortType, numPeople);
    });
    
  }
  

  displayPeopleSortedBy('age', 10);

// Event listener for the sort dropdown
document.getElementById('sort-dropdown').addEventListener('change', (event) => {
    const sortType = event.target.value;
    const limit = parseInt(document.getElementById('limit-dropdown').value);
    displayPeopleSortedBy(sortType, limit);
  });
  
  // Event listener for the limit dropdown
  document.getElementById('limit-dropdown').addEventListener('change', (event) => {
    const sortType = document.getElementById('sort-dropdown').value;
    const limit = parseInt(event.target.value);
    displayPeopleSortedBy(sortType, limit);
  });
  
// Function to reverse the list of people
function reverseList() {
    const tbody = document.querySelector('#table-container tbody');
    const rows = Array.from(tbody.querySelectorAll('tr'));
    rows.reverse();
    tbody.innerHTML = '';
    tbody.append(...rows);
  }
  
  
  // Event listener for the reverse button
  document.getElementById('reverse-button').addEventListener('click', reverseList);
  


import { useState, useEffect } from 'react'

import personService from './services/persons'
import Search from './components/Search'
import Persons from './components/Persons'
import PersonForm from './components/PersonForm'
import Notification from './components/Notification'
import displayService from './services/display'

const App = () => {
    const [persons, setPersons] = useState([])
    const [newName, setNewName] = useState('')
    const [newNumber, setNewNumber] = useState('')
    const [searchField, setSearchField] = useState('')
    const [notificationMessage, setNotificationMessage] = useState(null)
    const [status, setStatus] = useState('')

    useEffect(() => {
        personService
            .getAll()
            .then(response => setPersons(response.data))
    }, [])

    const personsToShow = !searchField
        ? persons
        : persons.filter(person => person.name.toLowerCase().includes(searchField.toLowerCase()))

    const addNewName = (event) => {
        event.preventDefault()

        if (newName === '' || newNumber === '') {
            alert('Please enter both a name and a number')
        }

        else {
            var duplicate = false
            const foundPerson = persons.find(person => person.name == newName)
            // console.log(foundPerson)
            if (foundPerson) {
                const changeNumber = window.confirm(`${newName} is already added to the phonebook. Replace the old number with a new one?`)
                if (changeNumber) {
                    const personObject = {
                        ...foundPerson,
                        number: newNumber
                    }
                    personService
                        .update(foundPerson.id, personObject)
                        .then(response => {
                            setPersons(persons.map(p => p.name !== newName ? p : response.data))
                            setStatus('success')
                            setNotificationMessage(`${newName}'s number has been changed`)
                            setNewName('')
                            setNewNumber('')
                        })
                        .catch(error => {
                            setNotificationMessage(`${newName} has already been deleted`)
                            setStatus('error')
                            setPersons(persons.filter(p => p.name !== newName))
                            setNewName('')
                            setNewNumber('')
                        })
                }
            }
            else if (persons.find(person => person.number === newNumber)) {
                alert(`${newNumber} is already taken`)
            }
            else if (!duplicate) {
                const personObject = {
                    name: newName,
                    number: newNumber,
                    id: persons[persons.length - 1].id + 1
                }
                personService
                    .create(personObject)
                    .then(response => {
                        setPersons(persons.concat(personObject))
                        setStatus('success')
                        displayService.displayNotification(`${newName} added`, setNotificationMessage)
                        setNewName('')
                        setNewNumber('')
                    })
                }
            }
    }

    const handleNameInput = (event) => setNewName(event.target.value)

    const handleNumberInput = (event) => setNewNumber(event.target.value)

    const handleSearchField = (event) => {
        setSearchField(event.target.value)
    }

    return (
        <div>
            <h2>Phonebook</h2>

            <Notification message={notificationMessage} status={status} />

            <h2>add new</h2>
            <PersonForm
                addNewName={addNewName}
                newName={newName}
                handleNameInput={handleNameInput}
                newNumber={newNumber}
                handleNumberInput={handleNumberInput}
            />

            <h2>Numbers</h2>
            <Search searchField={searchField} handleSearchField={handleSearchField} />
            <Persons personsToShow={personsToShow} />
        </div>
    )
}

export default App

let todoInput
let errorInfo
let addBtn
let ulList
let newTodo

let popup
let popupInfo
let todoEdit
let popupInput
let popupAddBtn
let popupCloseBtn

const main = () => {
    prepareDOMElements()
    prepareDOMEvents()
}

const prepareDOMElements = () => {
    todoInput = document.querySelector('.top-todo-task')
    errorInfo = document.querySelector('.taskError')
    addBtn = document.querySelector('.top-todo-btn')
    ulList = document.querySelector('.tasksList-todo ul')

    popup = document.querySelector('.popup')
    popupInfo = document.querySelector('.popupTxt')
    popupInput = document.querySelector('.popupTask')
    popupAddBtn = document.querySelector('.popupCompletBtn')
    popupCloseBtn = document.querySelector('.popupDeleteBtn')
}

const prepareDOMEvents = () => {
    addBtn.addEventListener('click', taskCreate)
    ulList.addEventListener('click', checkClick)
    popupCloseBtn.addEventListener('click', closeTodo)
    popupAddBtn.addEventListener('click', changeTodoText)
    todoInput.addEventListener('keyup', enterKeyCheck)
}


const taskCreate = () => {
    if(todoInput.value !== '') {
        newTodo = document.createElement('li')
        newTodo.textContent = todoInput.value
        createTools()
       
        ulList.append(newTodo)

        todoInput.value = ''
        errorInfo.textContent = ''
    } else {
        errorInfo.textContent = "Wpisz treść zadania!"
    }
}

const createTools = () => {
    const toolsPanel = document.createElement('div')
    toolsPanel.classList.add('tools')
    newTodo.append(toolsPanel)

    const completeBtn = document.createElement('button')
    completeBtn.classList.add('complet')
    completeBtn.innerHTML = '<i class="fa-solid fa-check"></i>'

    const editBtn = document.createElement('button')
    editBtn.classList.add('edit')
    editBtn.textContent = 'EDIT'

    const deleteBtn = document.createElement('button')
    deleteBtn.classList.add('delete')
    deleteBtn.innerHTML = '<i class="fa-solid fa-xmark"></i>'

    toolsPanel.append(completeBtn, editBtn, deleteBtn)
}


const checkClick = e => {
    if(e.target.matches('.complet')) {
        e.target.closest('li').classList.toggle('completed')
        e.target.classList.toggle('completed')
    } else if(e.target.matches('.edit')) {
        editTodo(e)
    } else if(e.target.matches('.delete')) {
        deleteTodo(e)
    }
}

const editTodo = e => {
    popup.style.visibility = 'visible'

    todoEdit = e.target.closest('li')
    popupInput.value = todoEdit.firstChild.textContent
}

const closeTodo = () => {
    popup.style.visibility = 'hidden'
    popupInfo.textContent = ''
}

const changeTodoText = () => {
    if(popupInput.value !== '') {
        todoEdit.firstChild.textContent = popupInput.value
        closeTodo()
    } else {
        popupInfo.textContent = 'Musisz podać jakąś treść!'
    }
}

const deleteTodo = e => {
    e.target.closest('li').remove()

    const allTodos = ulList.querySelectorAll('li')

    if(allTodos.length === 0) {
        errorInfo.textContent = 'Brak zadań na liście'
    }
}

const enterKeyCheck = e => {
    if(e.key === 'Enter') {
        taskCreate()
    }
}


document.addEventListener('DOMContentLoaded', main)
document.addEventListener('DOMContentLoaded', function() {
    const taskList = document.getElementById('taskList');
    const addTaskBtn = document.getElementById('addTaskBtn');
    const saveTaskBtn = document.getElementById('saveTaskBtn');
    const taskModal = document.getElementById('taskModal');
    const taskNameInput = document.getElementById('taskName');
    const dueDateInput = document.getElementById('dueDate');
    const categoryInput = document.getElementById('category');
    const categoryFilter = document.getElementById('categoryFilter');
  
    let tasks = [];
  
    addTaskBtn.addEventListener('click', () => {
      taskModal.style.display = 'block';
    });
  
    saveTaskBtn.addEventListener('click', () => {
      const taskName = taskNameInput.value;
      const dueDate = dueDateInput.value;
      const category = categoryInput.value;
  
      if (taskName && dueDate && category) {
        const task = { name: taskName, dueDate, category };
        tasks.push(task);
        renderTasks();
        resetTaskForm();
        taskModal.style.display = 'none';
      }
    });
  
    categoryFilter.addEventListener('change', () => {
      renderTasks();
    });
  
    function renderTasks() {
      const filteredTasks = filterTasksByCategory(tasks, categoryFilter.value);
      const sortedTasks = sortTasksByDueDate(filteredTasks);
  
      taskList.innerHTML = '';
  
      sortedTasks.forEach((task, index) => {
        const taskElement = createTaskElement(task, index);
        taskList.appendChild(taskElement);
      });
    }
  
    function createTaskElement(task, index) {
        const taskElement = document.createElement('li');
        taskElement.className = 'task';
        taskElement.draggable = true;
        taskElement.dataset.index = index;
      
        const deleteButton = document.createElement('button');
        deleteButton.className = 'delete-btn';
        deleteButton.textContent = 'Delete';
        deleteButton.addEventListener('click', () => deleteTask(index));
      
        taskElement.innerHTML = `
          <span>${task.name}</span>
          <span>${task.dueDate}</span>
          <span>${task.category}</span>
        `;
      
        taskElement.appendChild(deleteButton);
      
        taskElement.addEventListener('dragstart', handleDragStart);
        taskElement.addEventListener('dragover', handleDragOver);
        taskElement.addEventListener('drop', handleDrop);
      
        return taskElement;
      }
      
  
    function resetTaskForm() {
      taskNameInput.value = '';
      dueDateInput.value = '';
      categoryInput.value = 'work';
    }
  
    function filterTasksByCategory(tasks, category) {
      if (category === 'all') {
        return tasks;
      } else {
        return tasks.filter(task => task.category === category);
      }
    }
  
    function sortTasksByDueDate(tasks) {
      return tasks.sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate));
    }
  
    function deleteTask(index) {
        tasks.splice(index, 1);
        renderTasks();
      }
      function handleDragStart(e) {
        e.dataTransfer.setData('text/plain', e.target.parentElement.dataset.index);
      }
      
      function handleDragOver(e) {
        e.preventDefault();
        const draggedElement = document.querySelector('.dragging');
        if (draggedElement && draggedElement !== e.target) {
          e.target.classList.add('over');
        }
      }
      
      function handleDrop(e) {
        e.preventDefault();
      
        const fromIndex = parseInt(e.dataTransfer.getData('text/plain'), 10);
        const toIndex = parseInt(e.target.dataset.index, 10);
      
        const draggedElement = document.querySelector('.dragging');
        if (draggedElement) {
          draggedElement.classList.remove('dragging', 'over');
      
          if (!isNaN(fromIndex) && !isNaN(toIndex) && fromIndex !== toIndex) {
            const taskToMove = tasks[fromIndex];
            tasks.splice(fromIndex, 1);
            tasks.splice(toIndex, 0, taskToMove);
      
            renderTasks();
          }
        }
      }
      
      
      
            
      function clearDraggingStyles() {
        const draggingElement = document.querySelector('.dragging');
        if (draggingElement) {
          draggingElement.classList.remove('dragging');
        }
      }
      
      
  
    // Close the modal when the close button is clicked
    document.querySelector('.close').addEventListener('click', () => {
      taskModal.style.display = 'none';
    });
  
    // Close the modal if the user clicks outside of it
    window.addEventListener('click', (event) => {
      if (event.target === taskModal) {
        taskModal.style.display = 'none';
      }
    });
  
    // Initialize the app with some sample tasks
    tasks = [
      { name: 'Task 1', dueDate: '2023-12-01', category: 'work' },
      { name: 'Task 2', dueDate: '2023-12-05', category: 'personal' },
      { name: 'Task 3', dueDate: '2023-11-30', category: 'shopping' }
    ];
  
    renderTasks();
  });
  
  

  
  
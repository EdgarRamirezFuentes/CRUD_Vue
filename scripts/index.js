const Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3000
  });
const app = new Vue({
    el: '#app',
    data:{
        tasks: [
            {name: 'APRENDER HTML', done: false},
            {name: 'APRENDER CSS', done: false},
            {name: 'APRENDER JAVASCRIPT', done: false},
        ],
        taskInput: '',
    },
    methods:{
        addTask(task){
            task = task.toUpperCase();
            if(task != ''){  
                if(this.alreadyExist(task)){
                    Swal.fire(
                        'Adventencia'.toUpperCase(),
                        'La tarea '.toUpperCase() + task + ' ya existe en la lista.'.toUpperCase(),
                        'warning'
                    );
                    this.taskInput ='';
                }else{
                    this.tasks.push({name: task, done: false});
                    this.taskInput = '';
                    this.taskAdded(task);
                }
            }else{
                Swal.fire(
                    'Error'.toUpperCase(),
                    'Campo requerido, no dejar en blanco.'.toUpperCase(),
                    'error'
                  )
            }
        },
        async modifyTask(task){   
            let {value: newName} = await Swal.fire({
                title: 'Ingresa el nuevo nombre de ' + task,
                input: 'text',
                inputValue: '',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Modificar'.toUpperCase(),
                cancelButtonText: 'cancelar'.toUpperCase(),
                inputValidator: (value) => {
                  if (!value) {
                    return 'Campo requerido.'.toUpperCase();
                  }
                }
            });
            newName= newName.toUpperCase();
            if(this.alreadyExist(newName)){
                Swal.fire(
                    'ERROR'.toUpperCase(),
                    'Ese nombre ya existe en la lista.'.toUpperCase(),
                    'error'
                );
            }else{
                for(taskF of this.tasks){
                    if(taskF.name == task){
                        taskF.name = newName;
                        this.taskModified();
                    }
                }
            }

        },
        removeTask(task){
            Swal.fire({
                title: '¿Estás seguro?'.toUpperCase(),
                text: "Se eliminará ".toUpperCase() + task +" de la lista.".toUpperCase(),
                type: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Sí, borrar'.toUpperCase(),
                cancelButtonText: 'cancelar'.toUpperCase(),
              }).then((result) => {
                if (result.value) {
                    this.tasks.forEach((taskF, index) =>{
                        if(taskF.name == task){
                            this.tasks.splice(index,1);
                        }
                    });
                    Toast.fire({
                        type: 'success',
                        title: task +' eliminada correctamente.'.toUpperCase()
                    });
                }
              });
        },
        alreadyExist(task){
            let alreadyExist = false
            for(let taskF of this.tasks){
                console.log(taskF);
                if(taskF.name == task){
                    alreadyExist = true;
                    break;
                }
            }
            return alreadyExist;
        },
        taskDone(task){
            Toast.fire({
                type: 'success',
                title: task + ' hecha.'.toUpperCase()
            });
        },
        taskPending(task){
            Toast.fire({
                type: 'warning',
                title: task +' pendiente.'.toUpperCase()
            });
        },
        taskAdded(task){
            Toast.fire({
                type: 'success',
                title: task +' agregada correctamente.'.toUpperCase()
            });
        },
        taskModified(task){
            Toast.fire({
                type: 'success',
                title: 'Tarea modificada correctamente.'.toUpperCase()
            });
        }
    },
});
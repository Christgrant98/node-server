var running_program = true;
const tareas = [];
console.log('Bienvenido al gestor de tareas \n');

const printDashedLine = () => console.log('-------------------------------');
const ask = (question) => {
  const rl = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  return new Promise((resolve) => {
    rl.question(question, (input) => {
      rl.close();
      resolve(input);
    });
  });
};

const logTasks = (title) => {
  console.log(title || 'Lista de tareas');
  tareas.map(({ indicator, description, status }) => {
    console.log(
      `Tarea ${indicator}, descripción: ${description}, estado: ${status} \n`
    );
  });
};

const addTask = async () => {
  const data = { status: 'No completado' };
  data.indicator = await ask('\n Ingrese un indicador \n');
  if (tareas.length > 0 && tareas.find((t) => t.indicator == data.indicator)) {
    console.log('\n Ya existe una tarea con ese indicador \n');
    return;
  }
  data.description = await ask('\n Ingrese una descripción \n');

  tareas.push(data);
  console.log('\n Tarea añadida exitosamente \n');
};

const removeTask = async (tareas) => {
  if (tareas.length == 0) return console.log('No hay tareas! \n');
  const indicator = await ask(
    '\n Ingrese el indicador de la tarea que desea eliminar \n'
  );
  const indexTaskToDelete = tareas.findIndex(
    (task) => task.indicator == indicator
  );
  if (indexTaskToDelete !== -1) {
    tareas.splice(indexTaskToDelete, 1);
    console.log('\n Tarea eliminada exitosamente \n');
  } else {
    console.log('\n Tarea inexistente \n');
  }
};

const completeTask = async () => {
  if (tareas.length == 0) return console.log('No hay tareas! \n');
  const indicator = await ask(
    '\n Ingrese el indicador de la tarea que desea completar \n'
  );
  const indexTaskToDelete = tareas.findIndex(
    (task) => task.indicator == indicator
  );
  if (indexTaskToDelete !== -1) {
    tareas[indexTaskToDelete].status = 'Completado';
    console.log('\n Tarea completada exitosamente \n');
  } else {
    console.log('\n Tarea inexistente \n');
  }
};

const program = async () => {
  do {
    printDashedLine();
    logTasks('\n Lista de tareas actual \n');
    printDashedLine();
    const opcion = await ask(
      'Opciones del programa: \n 1: Añadir tarea \n 2: Completar tarea \n 3: Eliminar tarea \n 4: Ver lista de tareas actual \n 5: Salirse del programa \n'
    );
    switch (opcion) {
      case '1':
        await addTask(tareas);
        break;
      case '2':
        await completeTask(tareas);
        break;
      case '3':
        await removeTask(tareas);
        break;
      case '4':
        logTasks('\n Lista de tareas actual \n');
        break;
      case '5':
        running_program = false;
        break;

      default:
        console.log('Esta opción no existe \n');
        printDashedLine();
        break;
    }
  } while (running_program);
};

program();

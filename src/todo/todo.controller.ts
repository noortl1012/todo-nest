import { Controller, Post, Delete, Get, Put, Req,Res, Body, Param, NotFoundException } from '@nestjs/common';
import { Todo } from './entities/todo.entity'; 

@Controller('todo')
export class TodoController {
    constructor(){
         this.todos = []; 
    }
    todos: Todo[]; 
    @Get()
    getTodos(){
       return this.todos ; }
    
    @Get('/:id')
    getTodoById(
        @Param('id') id
    ){
        const todo = this.todos.find((actualTodo: Todo) => actualTodo.id == +id)
        if (todo)
           return todo;
        throw new NotFoundException ('le todo nexiste pas'); 
    }

    @Post()
    addTodo(
        @Body() newTodo: Todo 
    ) {
        if (this.todos.length){
            newTodo.id= this.todos[this.todos.length -1].id +1; 
        }
        else {
            newTodo.id = 1; 
        }
        this.todos.push(newTodo);
        return newTodo ; 
        
    }
//supprimer todo via son id
    @Delete(':id')
    deleteTodoById(
        @Param('id') id
    ) {
        //chercher l'objet via son id dans le tableau des todos
     const index = this.todos.findIndex((todo: Todo) => todo.id === id); 
        
        //utiliser la methode slice pour supprimer le todo s'il existe 
        if (index>0) {
            this.todos.splice(index, 1)
        } 
        else {
            throw new NotFoundException ('le Todo nexiste pas');
        }
    return {
        message: "le todo est supprimé ",
        count: 1 
    }; 
        //sinon je vais declencher une erreur 
    }

    @Put()
    modifierTodo() {
        console.log('modifier un todo a la liste des todos');
        return 'update todo' ; 
    }
}

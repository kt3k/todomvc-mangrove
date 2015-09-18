

var $ = require('jquery');


var TodoItem = $.cc.subclass(function (pt) {
    'use strict';

    pt.constructor = function (elem) {

        this.elem = elem;

        this.initElems();
        this.initEvents();

    };

    pt.initElems = function () {

        var view = $('<div class="view" />').appendTo(this.elem);

        $('<input class="toggle" type="checkbox" />').appendTo(view);
        $('<label />').appendTo(view);
        $('<button class="destroy" />').appendTo(view);
        $('<input class="edit" />').appendTo(this.elem).cc.init('todo-edit');

    };

    pt.initEvents = function () {

        var that = this;

        this.elem.find('.toggle').on('click', function () {

            that.toggleCompleted();

        });

        this.elem.find('.destroy').on('click', function () {

            that.destroy();

        });

        this.elem.find('label').on('dblclick', function () {

            that.startEditing();

        });

        this.elem.on('todo-edited', function (e, title) {

            that.stopEditing(title);

        });

    };

    /**
     * Updates the todo title by todo model
     *
     * @param {Todo} todo The todo
     */
    pt.update = function (todo) {

        this.elem.attr('id', todo.id);
        this.elem.find('label').text(todo.title);
        this.elem.find('.edit').val(todo.title);

        this.completed = todo.completed;
        this.updateCompleted();

    };

    pt.toggleCompleted = function () {

        this.elem.trigger('todo-item-toggle', this.elem.attr('id'));

        this.completed = !this.completed;
        this.updateCompleted();

    };

    pt.destroy = function () {

        this.elem.parent().trigger('todo-item-destroy', this.elem.attr('id'));

        this.elem.remove();

    };

    pt.updateCompleted = function () {

        if (this.completed) {

            this.complete();

        } else {

            this.uncomplete();
        }

    };

    pt.complete = function () {

        this.elem.find('.toggle').attr('checked', 'checked');
        this.elem.addClass('completed');

    };

    pt.uncomplete = function () {

        this.elem.find('.toggle').attr('checked', null);
        this.elem.removeClass('completed');

    };

    pt.startEditing = function () {

        this.elem.addClass('editing');

    };

    pt.stopEditing = function (title) {

        console.log(title);

        this.elem.removeClass('editing');

        if (title === '' || title == null) {

            that.destroy();
            return;

        }

        this.elem.find('label').text(title);

        this.elem.trigger('todo-item-edited', [this.elem.attr('id'), title]);

    };

});


$.cc.assign('todo-item', TodoItem);

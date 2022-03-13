(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-16e31944"],{5859:function(t,o,e){"use strict";e.r(o);var r=function(){var t=this,o=t.$createElement,e=t._self._c||o;return e("div",{staticClass:"flex flex-col"},[e("input",{directives:[{name:"model",rawName:"v-model",value:t.nameModel,expression:"nameModel"}],attrs:{placeholder:"Category Name"},domProps:{value:t.nameModel},on:{input:function(o){o.target.composing||(t.nameModel=o.target.value)}}}),e("input",{directives:[{name:"model",rawName:"v-model",value:t.colourModel,expression:"colourModel"}],style:{background:t.catColour},attrs:{placeholder:"Category Colour"},domProps:{value:t.colourModel},on:{input:function(o){o.target.composing||(t.colourModel=o.target.value)}}}),e("div",{staticClass:"button-group"},[e("button",{on:{click:t.changeSortCategory}},[t._v(t._s(t.sortBy))]),e("button",{on:{click:t.changeSortOrder}},["Ascending"===t.sortOrder?e("font-awesome-icon",{attrs:{icon:"arrow-up"}}):e("font-awesome-icon",{attrs:{icon:"arrow-down"}})],1)]),t._l(t.todos,(function(t){return e("ToDoListItem",{key:t.id,attrs:{todo:Object.assign({},t)}})})),e("div",{staticClass:"flex justify-center w-full"},[e("input",{directives:[{name:"model",rawName:"v-model",value:t.name,expression:"name"}],attrs:{placeholder:"Add a to do here..."},domProps:{value:t.name},on:{input:function(o){o.target.composing||(t.name=o.target.value)}}}),e("button",{on:{click:function(o){return o.preventDefault(),t.addToDo.apply(null,arguments)}}},[e("font-awesome-icon",{attrs:{icon:"plus"}})],1)])],2)},n=[],a=e("5530"),s=(e("b0c0"),e("2f62")),i=e("d82d"),c={name:"TodosCategory",components:{ToDoListItem:i["a"]},data:function(){return{name:""}},computed:Object(a["a"])(Object(a["a"])(Object(a["a"])({id:function(){return this.$route.params.categoryId}},Object(s["c"])({categories:function(t){return t.todos.categories},sortOrder:function(t){return t.todos.sfOptions.sortOrder},sortBy:function(t){return t.todos.sfOptions.sortBy}})),Object(s["b"])("todos",["todosByCategory","todosCategory"])),{},{category:function(){return this.todosCategory(this.$route.params.categoryId)},todos:function(){return this.todosByCategory(this.$route.params.categoryId)},nameModel:{get:function(){return this.category.name},set:function(t){this.$store.dispatch("todos/setCategoryName",{id:this.id,name:t})}},colourModel:{get:function(){return this.category.colour},set:function(t){this.$store.dispatch("todos/setCategoryColour",{id:this.id,colour:t})}},catColour:function(){return this.category.colour||"none"}}),created:function(){this.$store.todos&&this.$store.todos.categories||this.$store.dispatch("todos/getTodosFromLocal")},methods:{changeSortCategory:function(){this.$store.dispatch("todos/setSortBy")},changeSortOrder:function(){this.$store.dispatch("todos/toggleSortOrder")},addToDo:function(){this.$store.dispatch("todos/addTodo",{categoryId:this.id,text:this.name}),this.name=""}}},d=c,u=e("2877"),l=Object(u["a"])(d,r,n,!1,null,null,null);o["default"]=l.exports},"825d":function(t,o,e){"use strict";var r=function(){var t=this,o=t.$createElement,e=t._self._c||o;return e("button",{staticClass:"w-12 transition-all duration-300",class:t.checked?"bg-green-800 hover:bg-green-500":"bg-red-800 hover:bg-red-500",on:{click:t.toggle}},[t.checked?e("font-awesome-icon",{attrs:{icon:"check"}}):e("font-awesome-icon",{attrs:{icon:"times"}})],1)},n=[],a={name:"ToggleButton",props:["checked","toggleFn"],methods:{toggle:function(){this.toggleFn()}}},s=a,i=e("2877"),c=Object(i["a"])(s,r,n,!1,null,null,null);o["a"]=c.exports},b1ad:function(t,o,e){},d82d:function(t,o,e){"use strict";var r=function(){var t=this,o=t.$createElement,e=t._self._c||o;return e("div",{staticClass:"item"},[e("ToggleButton",{attrs:{checked:t.todo.completed,toggleFn:t.toggleCompleted}}),e("textarea-autosize",{attrs:{autosize:"",rows:"1"},model:{value:t.textModel,callback:function(o){t.textModel=o},expression:"textModel"}}),e("input",{attrs:{type:"date"},domProps:{value:t.todo.dueDate.toISOString().split("T")[0]},on:{input:function(o){return t.setDate(o.target.value,t.todo)}}}),e("select",{directives:[{name:"model",rawName:"v-model.number",value:t.todo.priority,expression:"todo.priority",modifiers:{number:!0}}],staticClass:"opacity-80",class:5===t.todo.priority?"bg-purple-800":4===t.todo.priority?"bg-red-800":3===t.todo.priority?"bg-yellow-800":2===t.todo.priority?"bg-blue-800":"bg-green-800",on:{change:function(o){var e=Array.prototype.filter.call(o.target.options,(function(t){return t.selected})).map((function(o){var e="_value"in o?o._value:o.value;return t._n(e)}));t.$set(t.todo,"priority",o.target.multiple?e:e[0])}}},[e("option",{attrs:{value:"1"}},[t._v("1")]),e("option",{attrs:{value:"2"}},[t._v("2")]),e("option",{attrs:{value:"3"}},[t._v("3")]),e("option",{attrs:{value:"4"}},[t._v("4")]),e("option",{attrs:{value:"5"}},[t._v("5")])]),e("select",{directives:[{name:"model",rawName:"v-model",value:t.categoryModel,expression:"categoryModel"}],staticClass:"w-full ml-1 md:w-min",style:{background:t.catColour},attrs:{placeholder:"Category"},on:{change:function(o){var e=Array.prototype.filter.call(o.target.options,(function(t){return t.selected})).map((function(t){var o="_value"in t?t._value:t.value;return o}));t.categoryModel=o.target.multiple?e:e[0]}}},[e("option",{staticClass:"text-white",attrs:{disabled:"",value:""}},[t._v("Select category")]),t._l(t.categories,(function(o){return e("option",{key:o.id,domProps:{value:o.id}},[t._v(" "+t._s(o.name)+" ")])}))],2),e("div",{staticClass:"ml-1 button-group"},[e("router-link",{attrs:{to:{name:"TodosCategory",params:{categoryId:t.todo.categoryId}}}},[e("button",{directives:[{name:"show",rawName:"v-show",value:t.showCatLink,expression:"showCatLink"}]},[e("font-awesome-icon",{attrs:{icon:"eye"}})],1)]),e("button",{on:{click:function(o){return t.removeTodo(t.todo)}}},[e("font-awesome-icon",{attrs:{icon:"trash"}})],1)],1)],1)},n=[],a=e("5530"),s=(e("7db0"),e("d3b7"),e("2f62")),i=e("825d"),c={name:"ToDoListItem",props:["todo","showCatLink"],components:{ToggleButton:i["a"]},computed:Object(a["a"])(Object(a["a"])({},Object(s["c"])({categories:function(t){return t.todos.categories}})),{},{catColour:function(){var t=this;if(this.todo.categoryId){var o=this.categories.find((function(o){return o.id===t.todo.categoryId}));return o?o.colour:"none"}return"none"},textModel:{get:function(){return this.todo.text},set:function(t){this.$store.dispatch("todos/setTodo",Object(a["a"])(Object(a["a"])({},this.todo),{},{text:t}))}},categoryModel:{get:function(){return this.todo.categoryId},set:function(t){this.$store.dispatch("todos/setTodosCategory",{id:this.todo.id,categoryId:t})}}}),methods:{toggleCompleted:function(){this.$store.dispatch("todos/setTodo",Object(a["a"])(Object(a["a"])({},this.todo),{},{completed:!this.todo.completed}))},removeTodo:function(t){this.$store.dispatch("todos/removeTodo",t)},setDate:function(t,o){var e=new Date(t);this.$store.dispatch("todos/setTodo",Object(a["a"])(Object(a["a"])({},o),{},{dueDate:e})),o.dueDate=new Date(this.$el.value)}}},d=c,u=(e("f445"),e("2877")),l=Object(u["a"])(d,r,n,!1,null,"061cf013",null);o["a"]=l.exports},f445:function(t,o,e){"use strict";e("b1ad")}}]);
//# sourceMappingURL=chunk-16e31944.6f79bc37.js.map
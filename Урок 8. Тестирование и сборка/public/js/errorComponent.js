Vue.component('error', {
   props: ['visibility'],
   template: `
      <div class="error-block" v-show="visibility">
         <h4>Не удаётся выполнить запрос к серверу!</h4>
      </div>
   `
});

// export default error

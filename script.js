const sample = "12.8.2015\n12.8.1015";

const formatsInput = [
  { text: 'DD.MM.YYYY', value: 'DD.MM.YYYY' },
  { text: 'MM.DD.YYYY', value: 'MM.DD.YYYY' },
  { text: 'MM.DD.YY', value: 'MM.DD.YY' },
  { text: 'YYYY.MM.DD', value: 'YYYY.MM.DD' },
  { text: 'DD.MM.YYYY hh:mm:ss', value: 'DD.MM.YYYY hh:mm:ss' },
];

const formatsOutput = [
  { text: 'Timestamp', value: 'X' },
  { text: 'YYYY-MM-DD', value: 'YYYY-MM-DD' },
  { text: 'DD-MM-YYYY', value: 'DD-MM-YYYY' },
  { text: 'DD/MM/YYYY hh:mm:ss', value: 'DD/MM/YYYY hh:mm:ss' },
  { text: 'ISO 8601', value: null }, 
];

new Vue({
  el: '#timeconverter',
  data: {
    iFormat: _.first(formatsInput).value,
    oFormat: _.first(formatsOutput).value,
    formatsInput: formatsInput,
    formatsOutput: formatsOutput,
    input: sample,
    separator: "\n"
  },
  computed: {
    compiledList: function () {
      const { input, separator, iFormat, oFormat } = this;
      
      const lines = input.split(this.separator);
      
      const timestamps = _.map(lines, line => {
        return moment(line, iFormat).format(oFormat);
      });
      
      return timestamps.join(separator);
    }
  },
  methods: {
    updateInput: _.debounce(function (e) {
      this.input = e.target.value
    }, 300)
  }
})

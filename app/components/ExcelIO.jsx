import React, {Component} from 'react';
import XLSX from 'xlsx';
import {remote} from 'electron';

class ExcelIO extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      workbook: null
    };
    
    this.table = React.createRef();
    this.showFileDialog = this.showFileDialog.bind(this);
  }
  
  showFileDialog(event) {
    remote.dialog.showOpenDialog({
      properties: ['openFile']
    }, files => {
      const file = files[0];
      const workbook = XLSX.readFile(file);
      
      // get worksheet
      const worksheet = workbook.Sheets[workbook.SheetNames[0]];
      this.table.current.innerHTML = XLSX.utils.sheet_to_html(worksheet);
    });
  }
  
  render() {
    return (
      <div>
        <div><button onClick={this.showFileDialog}>file</button></div>
        <div ref={this.table} />
      </div>
    );
  }
}

export default ExcelIO;

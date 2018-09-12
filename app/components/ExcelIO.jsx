import React, {Component} from 'react';
import XLSX from 'xlsx';
import {remote} from 'electron';
import map from 'lodash/map';

class ExcelIO extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      data: []
    };
    
    this.table = React.createRef();
    this.showFileDialog = this.showFileDialog.bind(this);
    this.renderTable = this.renderTable.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }
  
  showFileDialog(event) {
    remote.dialog.showOpenDialog({
      properties: ['openFile']
    }, files => {
      if (!files) return;
      
      const file = files[0];
      const workbook = XLSX.readFile(file);
      
      // get worksheet
      const worksheet = workbook.Sheets[workbook.SheetNames[0]];
      // this.table.current.innerHTML = XLSX.utils.sheet_to_html(worksheet);
      
      const rowsData = XLSX.utils.sheet_to_json(worksheet, {header: 1});
      const data = map(rowsData, row => (
        map(row, el => el ? String(el) : '')
      ));
      this.setState({data});
    });
  }
  
  handleChange(value, i, j) {
    const data = this.state.data;
    data[i][j] = value;
    this.setState({data});
  }
  
  renderTable() {
    return (<table>
      <tbody>
        {
          map(this.state.data, (row, i) => (<tr key={i}>
				    {map(row, (item, j) => <td key={j}><input value={item} onChange={e => this.handleChange(e.target.value, i, j)}></input></td>)}
          </tr>))
        }
      </tbody>
    </table>);
  }
  
  render() {
    return (
      <div>
        <div><button onClick={this.showFileDialog}>file</button></div>
        <div>{this.renderTable()}</div>
      </div>
    );
  }
}

export default ExcelIO;

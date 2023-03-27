import React, { Component } from 'react'
import { MDBContainer, MDBRow, MDBCol, MDBCard, MDBCardBody } from 'mdb-react-ui-kit'
import { MDBDataTable } from '../../components/DataTable/DataTable'
import DocsLink from '../../components/docsLink'
import SectionContainer from '../../components/sectionContainer'
import '../../css/table01.css'
import { reqdoSQL } from '../../api/dosql'
import dataDefault from './data02'
import dataProducts from './data01'

class Dosql01 extends Component {
  state = {
    data: {},
    data01: dataProducts,
    data02: dataDefault,
  }

  async componentDidMount() {
    let p = {}
    p.sqlprocedure = 'dosql01'
    let rows = await reqdoSQL(p)
    rows = rows.rows
    let columns = []
    columns.push({ label: 'Data1', field: 'id', sort: 'asc', width: 150 })
    columns.push({ label: 'Data2', field: 'id1', sort: 'asc', width: 150 })
    columns.push({ label: 'Data3', field: 'id2', sort: 'asc', width: 150 })
    columns.push({ label: 'Data4', field: 'id3', sort: 'asc', width: 150 })
    columns.push({ label: 'Data5', field: 'id4', sort: 'asc', width: 150 })
    columns.push({ label: 'Data6', field: 'id5', sort: 'asc', width: 150 })

    this.setState({ data: { columns, rows } })
    console.log(this.state.data)
  }

  render() {
    const  data  = this.state.data01
    return (
      <MDBContainer className="mt-3 jjq">
        <DocsLink title="Datatable" href="https://mdbootstrap.com/docs/react/tables/datatables/" />

        <MDBRow className="py-3">
          <MDBCol md="12">
            <SectionContainer header="Datatable with data from API" noBorder>
              <MDBCard>
                <MDBCardBody>
                  <MDBDataTable striped bordered hover data={data} />
                </MDBCardBody>
              </MDBCard>
            </SectionContainer>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    )
  }
}

export default Dosql01

import React from 'react';
import axios from "axios";
import './App.css';
import { AppBar,Toolbar,Box, CssBaseline, Container, Grid, Card, CardContent, Typography } from '@material-ui/core';
import Pagination from '@material-ui/lab/Pagination';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { pageData: [], Data: [], currentPage: 1 };
  }
  async componentDidMount() {
    const currentPage = this.state.currentPage;
    try {
      const data1 = await axios.get('https://reqres.in/api/users?page=' + currentPage)
      this.setState({ Data: data1.data.data, pageData: data1.data });
    } catch (error) {
      console.warn(error);
    }
  }
  componentDidUpdate(){
    this.componentDidMount();
  }
  setcurrentPage = async (value) => {
    try {
      const data1 = await axios.get('https://reqres.in/api/users?page=' + value);
      this.setState({ Data: data1.data.data, pageData: data1.data.total_pages });
    } catch (error) {
      console.warn(error);
    }
    this.setState({ currentPage: value });
  }

  render() {
    const { pageData, Data } = this.state;

    return (
      <>
      <AppBar position="static">
  <Toolbar>
    
    <Typography variant="h6" >
      EXCELLENCE USERLIST
    </Typography>
    
  </Toolbar>
</AppBar>
      <div>
        <CssBaseline />
        <Container component={Box} py={3}>
          <Grid container spacing={2}>
            {Data.map((item) => {
              return (
                <Grid item sm={4} key={item.id} style={{ padding: 20 }} >
                  <Card style={{ height: 250 }}>
                    <CardContent align={'center'} >
                      <img src={item.avatar} alt="Network Error"></img>
                      <Typography>{item.first_name} {item.last_name}</Typography>
                      <Typography>{item.email} </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              );
            })}
          </Grid>
          <Pagination align={'center'} style={{ marginTop: 10 }}
            count={pageData.total_pages} color="secondary" variant="outlined"
            defaultPage={1}
            onChange={(event, value) => this.setcurrentPage(value)}
            showFirstButton
            showLastButton
            shape="rounded"
          />
        </Container>
      </div></>
    );
  }
}

export default App;

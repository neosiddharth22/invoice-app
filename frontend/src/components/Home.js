import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Dash from './Dash';
import Invoicecreate from './invoicecreate';
import Invoices from './Invoices';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    'aria-controls': `vertical-tabpanel-${index}`,
  };
}

export default function Home() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ borderBottom: 1, borderColor: 'divider' }} >
      <Tabs style={{backgroundColor:"lightblue"}} value={value} onChange={handleChange} aria-label="basic tabs example">
        <Tab label="Home" {...a11yProps(0)} />
        <Tab label="New Invoice" {...a11yProps(1)} />
        <Tab label="preview Invoices" {...a11yProps(2)} />
    
      </Tabs>
      <TabPanel value={value} index={0}>
        <Dash />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <Invoicecreate />
      </TabPanel>
      <TabPanel value={value} index={2}>
        <Invoices />
      </TabPanel>

    </Box>
  );
}

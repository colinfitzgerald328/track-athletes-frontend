import * as React from 'react';
import Box from '@mui/material/Box';
import { PureComponent } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import Typography from '@mui/material/Typography';
import styles from "./styles.module.css";
import Modal from '@mui/material/Modal';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 1000,
  height: 500,
  bgcolor: '#59252e',
  borderRadius: '20px',
  outline: 'none',
  boxShadow: 24,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  padding: '30px',
};

export default function GraphModal(props) {
  const handleClose = () => props.closeGraphModal();

  const filteredResults = props.athlete.filter(result => result.resultScore !== 0 ).reverse();

  const CustomTooltip = ({ active, payload }) => {
    console.log(payload)
    if (active && payload && payload.length) {
      return (
        <div className={styles.customTooltip}>
          <p className={styles.label}>{`Score: ${payload[0].value}`}</p>
          <p className="label">
            <b style={{"marginRight": "5px"}}>Mark:</b> 
            {payload[0].payload.mark}
          </p>
          <p className="label">
            <b style={{"marginRight": "5px"}}>Event:</b>
            {payload[0].payload.discipline}
          </p>
          <p className="label">
          <b style={{"marginRight": "5px"}}>Competition:</b>
            {payload[0].payload.competition}
          </p>
          <p className="label">
          <b style={{"marginRight": "5px"}}>Date:</b>
            {payload[0].payload.date}
          </p>
        </div>
      );
    }
  
    return null;
  };

  return (
    <div>
      <Modal
        open={props.graphModalOpen}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div className={styles.graphName}>
            Performance Graph for {props.viewingAthlete.full_name}
          </div>
        <ResponsiveContainer
        className={styles.graphHolder}
        >
        <LineChart
          data={filteredResults}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid stroke='#59252e' strokeDasharray="3 3" />
          <XAxis dataKey="date"
          stroke='#59252e'
          />
          <YAxis 
          stroke='#59252e'
          domain={['dataMin - 100', 'dataMax + 100']}
          />
             <Tooltip content={<CustomTooltip />} cursor={{ stroke: "#325573", strokeDasharray: '3 3' }} />
          <Legend
          stroke='#59252e'
          />
          <Line name="Result Score" type="monotone" dataKey="resultScore" stroke="#59252e" activeDot={{ r: 8 }} />
        </LineChart>
      </ResponsiveContainer>
        </Box>
      </Modal>
    </div>
  );
}

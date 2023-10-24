import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import BasicSelect from '../InputTool/BasicSelect'
import FormControl from '@mui/material/FormControl';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

export default function ControlledAccordions(props) {
  const [expanded, setExpanded] = React.useState(false);
  
  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };


  return (
    <div>
      {Object.entries(props.cat).map(([key, value]) => {
         return <Accordion key={props.childKey+key} expanded={expanded === key } onChange={handleChange(key)}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1bh-content"
          id="panel1bh-header"
          key={`${props.childKey+key}Summary`}
        >
          <Typography component={'span'} variant={'body2'} sx={{ width: '33%', flexShrink: 0 }}>
          {key}
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          {value.map((item)=>{return( 
            // console.log(props.childKey+key+item)
          <FormControl key={props.childKey+key+item+'formControl'}>
          <BasicSelect 
          key ={props.childKey+key+item}  
          id={props.childKey+key+item} 
          name={item} 
          passValue={props.choiceHandler} 
          select={props.select} 
          prevSelect={props.prevSelect}/>
          </FormControl>
          )})}
        </AccordionDetails>
      </Accordion>})}
    </div>
  );
}

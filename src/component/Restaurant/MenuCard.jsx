import { Accordion, AccordionDetails, AccordionSummary,Button,Checkbox,FormControlLabel,FormGroup,Typography } from '@mui/material'
import React from 'react'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { categorizeIngredients } from '../Util/categrizeIngredients';


const demo=[
  {
    category:"Nuts & Seeds",
    ingredients:["Cashews"]
  },
  {
    category:"Protein",
    ingredients:["Ground Beef","Bacon Strips"]
  },

]


const MenuCard = ({item}) => {

  const handleCheckBoxChange=(value)=>{
    console.log(value)
  }

  return (
    <Accordion>
    <AccordionSummary
      expandIcon={<ExpandMoreIcon />}
      aria-controls="panel1-content"
      id="panel1-header"
    >
      
      <div className='lg:flex items-center justify-between'>
        <div className='lg:flex items-center lg:gap-5'>
          <img 
          className='w-[7rem] h-[7rem] object-cover'
          src=
          {item.images[0]}
           alt="" />


        <div className='space-y-1 lg:space-y-5 lg:max-w-2xl'>
          <p className='font-semibold text-xl'>{item.name}</p>
          <p>Rs{item.price}</p>
          <p className='text-gray-400'>{item.description}</p>

        </div>

        </div>

      </div>


    </AccordionSummary>
    <AccordionDetails>
     
     <form>
      <div className='flex gap-5 flex-wrap'>
        {
          Object.keys(categorizeIngredients(item.ingredients)).map((category)=>
            <div>
              <p>
                {
                  category
                }
              </p>
                    <FormGroup>
        {categorizeIngredients(item.ingredients)[category].map((item)=> 
        <FormControlLabel key={item.name}
        control={<Checkbox 
        onChange={()=>handleCheckBoxChange(item)}/>} label={item.name} />) }

        </FormGroup>
            </div>
      
          )
        }
      </div>
        
        <div className='pt-5'>
          <Button variant='contained' type='submit' disabled={false}>
          {true?"Add to Cart":"Out Of Stock"}
          </Button>
        </div>

     </form>


    </AccordionDetails>
  </Accordion>
  )
}

export default MenuCard
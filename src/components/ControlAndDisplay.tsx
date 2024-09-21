
import React, { useState,useMemo,useEffect  } from 'react';
import { Box, Grid, TextField,  Chip, FormControl, InputLabel, Select, MenuItem,  Typography } from '@mui/material';
import TuneIcon from '@mui/icons-material/Tune';
import NewspaperIcon from '@mui/icons-material/Newspaper';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip,  Legend,Area,AreaChart,ComposedChart, DefaultLegendContent,
    ResponsiveContainer, } from 'recharts';
import { Card,CardContent, CardDescription,CardFooter,CardHeader,CardTitle,} from "@/components/ui/card"
import { ChartConfig, ChartContainer,ChartTooltip, ChartTooltipContent,ChartLegend, ChartLegendContent} from "@/components/ui/chart"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Check, ChevronsUpDown } from "lucide-react"
import { cn } from "@/lib/utils"
import { Input } from "@/components/ui/input"
import { addDays, format, isWithinInterval } from "date-fns"
import { Calendar as CalendarIcon } from "lucide-react"
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import './style.css'; // 根据你的项目结构调整路径
import moment from 'moment';
import { Calendar } from "@/components/ui/calendar"
import { Badge } from "@/components/ui/badge"
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
  } from "@/components/ui/alert-dialog"
  
import { TrendingUp } from "lucide-react"
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"
  
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Close } from '@radix-ui/react-dialog';


const Ages = [
    {
      value: "Minor(<18)",
      label: "Minor(<18)",
    },
    {
      value: "Adults(18-65)",
      label: "Adults(18-65)",
    },
    {
      value: "Elderly(>65)",
      label: "Elderly(>65)",
    },
   
  ]
const diagnosis = [
    {
        "diagnosis": "Normal",
        "count": "1250",
    },
    {
        "diagnosis":"Mild Anemia",
        "count":"450"
    },
    {
        "diagnosis":"Moderate Anemia",
        "count":"200"
    },
    {
        "diagnosis":"Severe Anemia",
        "count":"80"
    },
    {
        "diagnosis":"Polycythemia",
        "count":"100"
    }
  ]

const BMIs = [
    {
      value: "Underweight(<18)",
      label: "Underweight(<18)",
    },
    {
      value: "Normal(18-24.9)",
      label: "Normal(18-24.9)",
    },
    {
      value: "Overweight(25-29.9)",
      label: "Overweight(25-29.9)",
    },
    {
      value: "Obesity(>30)",
      label: "Obesity(>30)",
    },
   
  ]

const Ethnicitys = [
    
    {
        value: "White British",
        label: "White British",
    },
    {
        value: "Other White Background",
        label: "Other White Background",
    },
    {
        value: "Black Caribbean",
        label: "Black Caribbean",
    },
    {
        value: "Other Asian Background",
        label: "Other Asian Background",
    },
  ]

const sexs = [
    {
      value: "male",
      label: "Male",
    },
    {
      value: "female",
      label: "Female",
    },
    {
        value: "all",
        label: "All",
      },
  ] 
 

  const chartConfig = {
    desktop: {
      label: "Desktop",
      color: "#2563eb",
    },
    mobile: {
      label: "Mobile",
      color: "#60a5fa",
    },
  } satisfies ChartConfig

  const getBadgeColor = (diagnosis: string) => {
    switch(diagnosis) {
      case 'Normal':
        return '#228B22'; 
      case 'Mild Anemia':
        return '#EEEE00'; 
      case 'Moderate Anemia':
        return '#EE7942'; 
      case 'Severe Anemia':
        return '#FF0000'; 
      case 'Polycythemia':
        return '#8A2BE2'; 
      default:
        return '#ccc';
    }
  };

  
  const initialDummyData = [
{ 
"time": "2024-01", 
"Age":12,
"sex":"all",
"MaleWBC": 5.4,  
"FemaleWBC": 4.95,
"MaleHGB": 12.6, 
"FemaleHGB": 9, 
"NormalRBC": 4.05, 
"MildAnemiaRBC": 5.85, 
"ModerateAnemiaRBC": 8.55,
"SevereAnemiaRBC":9.55,
"PolycythemiaRBC":11.55,
"UL95CI_MaleWBC": [5.67, 5.13],
"UL95CI_FemaleWBC": [5.2, 4.7],
"UL95CI_MaleHGB": [13.23, 11.97],
"UL95CI_FemaleHGB": [9.45, 8.55]
},
{ 
"time": "2024-02", 
"Age":12,
"sex":"all",
"MaleWBC": 4.86,  
"FemaleWBC": 4.46,
"MaleHGB": 11.34, 
"FemaleHGB": 8.1, 
"NormalRBC": 3.645, 
"MildAnemiaRBC": 5.265, 
"ModerateAnemiaRBC": 7.695,
"SevereAnemiaRBC":8.55,
"PolycythemiaRBC":10.55,
"UL95CI_MaleWBC": [5.1, 4.62],
"UL95CI_FemaleWBC": [4.68, 4.23],
"UL95CI_MaleHGB": [11.91, 10.78],
"UL95CI_FemaleHGB": [8.51, 7.7]

},
{ 
"time": "2024-03", 
"Age":12,
"sex":"all",
"MaleWBC": 5.589,  
"FemaleWBC": 5.129,
"MaleHGB": 13.04, 
"FemaleHGB": 9.315, 
"NormalRBC": 4.1925, 
"MildAnemiaRBC": 6.1275, 
"ModerateAnemiaRBC": 8.9325,
"SevereAnemiaRBC":7.55,
"PolycythemiaRBC":9.55,
"UL95CI_MaleWBC": [5.87, 5.31],
"UL95CI_FemaleWBC": [5.39, 4.87],
"UL95CI_MaleHGB": [13.69, 12.39],
"UL95CI_FemaleHGB": [9.78, 8.85]

},
{ 
"time": "2024-04", 
"Age":12,
"sex":"all",
"MaleWBC": 5.03,  
"FemaleWBC": 4.616,
"MaleHGB": 11.74, 
"FemaleHGB": 8.38, 
"NormalRBC": 3.773, 
"MildAnemiaRBC": 5.542, 
"ModerateAnemiaRBC": 8.06,
"SevereAnemiaRBC":6.55,
"PolycythemiaRBC":8.55,
"UL95CI_MaleWBC": [5.28, 4.78],
"UL95CI_FemaleWBC": [4.85, 4.39],
"UL95CI_MaleHGB": [12.33, 11.15],
"UL95CI_FemaleHGB": [8.8, 7.96]
},
{ 
"time": "2024-05", 
"Age":12,
"sex":"all",
"MaleWBC": 5.308,
"FemaleWBC": 5.7845,  
"MaleHGB": 13.5, 
"FemaleHGB": 9.64, 
"NormalRBC": 4.338, 
"MildAnemiaRBC": 6.373, 
"ModerateAnemiaRBC": 9.28,
"SevereAnemiaRBC":5.55,
"PolycythemiaRBC":7.55,
"UL95CI_MaleWBC": [5.57, 5.04],
"UL95CI_FemaleWBC": [6.07, 5.5],
"UL95CI_MaleHGB": [14.18, 12.83],
"UL95CI_FemaleHGB": [10.12, 9.16]
},
{ 
"time": "2024-06", 
"Age":12,
"sex":"all",
"MaleWBC": 5.206,  
"FemaleWBC": 4.777,
"MaleHGB": 12.15, 
"FemaleHGB": 8.676, 
"NormalRBC": 3.904, 
"MildAnemiaRBC": 5.736, 
"ModerateAnemiaRBC": 8.36,
"SevereAnemiaRBC":4.55,
"PolycythemiaRBC":6.55,
"UL95CI_MaleWBC": [5.47, 4.94],
"UL95CI_FemaleWBC": [5.02, 4.54],
"UL95CI_MaleHGB": [12.76, 11.55],
"UL95CI_FemaleHGB": [9.11, 8.24]
},
{ 
"time": "2024-07", 
"Age":12,
"sex":"all",
"MaleWBC": 5.986,  
"FemaleWBC": 5.493,
"MaleHGB": 13.97, 
"FemaleHGB": 9.977, 
"NormalRBC": 4.49, 
"MildAnemiaRBC": 6.6, 
"ModerateAnemiaRBC": 9.6,
"SevereAnemiaRBC":9.55,
"PolycythemiaRBC":11.55,
"UL95CI_MaleWBC": [6.29, 5.69],
"UL95CI_FemaleWBC": [5.77, 5.22],
"UL95CI_MaleHGB": [14.66, 13.27],
"UL95CI_FemaleHGB": [10.48, 9.48]
},
{ 
"time": "2024-08", 
"Age":12,
"sex":"all",
"MaleWBC":  4.944,
"FemaleWBC": 5.387,
"MaleHGB": 12.58, 
"FemaleHGB": 8.979, 
"NormalRBC": 4.041, 
"MildAnemiaRBC": 5.94, 
"ModerateAnemiaRBC": 8.64,
"SevereAnemiaRBC":10.55,
"PolycythemiaRBC":12.55,
"UL95CI_MaleWBC": [5.19, 4.7],
"UL95CI_FemaleWBC": [5.66, 5.11],
"UL95CI_MaleHGB": [13.21, 11.95],
"UL95CI_FemaleHGB": [9.43, 8.53]
},
{ 
"time": "2024-09", 
"Age":12,
"sex":"all",
"MaleWBC": 6.195,  
"FemaleWBC": 5.685,
"MaleHGB": 14.47, 
"FemaleHGB": 10.33, 
"NormalRBC": 4.647, 
"MildAnemiaRBC": 6.837, 
"ModerateAnemiaRBC": 9.945,
"SevereAnemiaRBC":11.55,
"PolycythemiaRBC":13.55,
"UL95CI_MaleWBC": [6.51, 5.88],
"UL95CI_FemaleWBC": [5.97, 5.4],
"UL95CI_MaleHGB": [15.19, 13.74],
"UL95CI_FemaleHGB": [10.85, 9.81]
},
{ 
"time": "2024-10", 
"Age":12,
"sex":"all",
"MaleWBC": 5.575,  
"FemaleWBC": 5.116,
"MaleHGB": 13.02, 
"FemaleHGB": 9.297, 
"NormalRBC": 4.182, 
"MildAnemiaRBC": 6.156, 
"ModerateAnemiaRBC": 8.964,
"SevereAnemiaRBC":9.55,
"PolycythemiaRBC":11.55,
"UL95CI_MaleWBC": [5.85, 5.29],
"UL95CI_FemaleWBC": [5.37, 4.86],
"UL95CI_MaleHGB": [13.67, 12.37],
"UL95CI_FemaleHGB": [9.76, 8.83]
},
{ 
"time": "2024-02", 
"Age":12,
"sex":"male",
"MaleWBC": 5.4,  
"MaleHGB": 12.6, 
"NormalRBC": 4.05, 
"MildAnemiaRBC": 5.85, 
"ModerateAnemiaRBC": 8.55,
"SevereAnemiaRBC":9.55,
"PolycythemiaRBC":11.55,
"UL95CI_MaleWBC": [5.67, 5.13],
"UL95CI_MaleHGB": [13.23, 11.97],
},
{ 
"time": "2024-03", 
"Age":12,
"sex":"male",
"MaleWBC": 4.86,  
"MaleHGB": 11.34, 
"NormalRBC": 3.645, 
"MildAnemiaRBC": 5.265, 
"ModerateAnemiaRBC": 7.695,
"SevereAnemiaRBC":8.55,
"PolycythemiaRBC":10.55,
"UL95CI_MaleWBC": [5.1, 4.62],
"UL95CI_MaleHGB": [11.91, 10.78],

},
{ 
"time": "2024-04", 
"Age":12,
"sex":"male",
"MaleWBC": 5.589,  
"MaleHGB": 13.04, 
"NormalRBC": 4.1925, 
"MildAnemiaRBC": 6.1275, 
"ModerateAnemiaRBC": 8.9325,
"SevereAnemiaRBC":7.55,
"PolycythemiaRBC":9.55,
"UL95CI_MaleWBC": [5.87, 5.31],
"UL95CI_MaleHGB": [13.69, 12.39],

},
{ 
"time": "2024-05", 
"Age":12,
"sex":"male",
"MaleWBC": 5.03,  
"MaleHGB": 11.74, 
"NormalRBC": 3.773, 
"MildAnemiaRBC": 5.542, 
"ModerateAnemiaRBC": 8.06,
"SevereAnemiaRBC":6.55,
"PolycythemiaRBC":8.55,
"UL95CI_MaleWBC": [5.28, 4.78],
"UL95CI_MaleHGB": [12.33, 11.15],
},
{ 
"time": "2024-06", 
"Age":12,
"sex":"male",
"MaleWBC": 5.308,
"MaleHGB": 13.5, 
"NormalRBC": 4.338, 
"MildAnemiaRBC": 6.373, 
"ModerateAnemiaRBC": 9.28,
"SevereAnemiaRBC":5.55,
"PolycythemiaRBC":7.55,
"UL95CI_MaleWBC": [5.57, 5.04],
"UL95CI_MaleHGB": [14.18, 12.83],
},
{ 
"time": "2024-07", 
"Age":12,
"sex":"male",
"MaleWBC": 5.206,  
"MaleHGB": 12.15, 
"NormalRBC": 3.904, 
"MildAnemiaRBC": 5.736, 
"ModerateAnemiaRBC": 8.36,
"SevereAnemiaRBC":4.55,
"PolycythemiaRBC":6.55,
"UL95CI_MaleWBC": [5.47, 4.94],
"UL95CI_MaleHGB": [12.76, 11.55],
},
{ 
"time": "2024-08", 
"Age":12,
"sex":"male",
"MaleWBC": 5.986,  
"MaleHGB": 13.97, 
"NormalRBC": 4.49, 
"MildAnemiaRBC": 6.6, 
"ModerateAnemiaRBC": 9.6,
"SevereAnemiaRBC":9.55,
"PolycythemiaRBC":11.55,
"UL95CI_MaleWBC": [6.29, 5.69],
"UL95CI_MaleHGB": [14.66, 13.27],
},
{ 
"time": "2024-09", 
"Age":12,
"sex":"male",
"MaleWBC":  4.944,
"MaleHGB": 12.58, 
"NormalRBC": 4.041, 
"MildAnemiaRBC": 5.94, 
"ModerateAnemiaRBC": 8.64,
"SevereAnemiaRBC":10.55,
"PolycythemiaRBC":12.55,
"UL95CI_MaleWBC": [5.19, 4.7],
"UL95CI_MaleHGB": [13.21, 11.95],
},
{ 
"time": "2024-10", 
"Age":12,
"sex":"male",
"MaleWBC": 6.195,  
"MaleHGB": 14.47, 
"NormalRBC": 4.647, 
"MildAnemiaRBC": 6.837, 
"ModerateAnemiaRBC": 9.945,
"SevereAnemiaRBC":11.55,
"PolycythemiaRBC":13.55,
"UL95CI_MaleWBC": [6.51, 5.88],
"UL95CI_MaleHGB": [15.19, 13.74],
},
{ 
"time": "2024-11", 
"Age":12,
"sex":"male",
"MaleWBC": 5.575,  
"MaleHGB": 13.02, 
"NormalRBC": 4.182, 
"MildAnemiaRBC": 6.156, 
"ModerateAnemiaRBC": 8.964,
"SevereAnemiaRBC":9.55,
"PolycythemiaRBC":11.55,
"UL95CI_MaleWBC": [5.85, 5.29],
"UL95CI_MaleHGB": [13.67, 12.37],
},
    { 
    "time": "2024-01", 
    "Age":12,
    "sex":"female",
    "FemaleWBC": 4.95,
    "FemaleHGB": 9, 
    "NormalRBC": 4.05, 
    "MildAnemiaRBC": 5.85, 
    "ModerateAnemiaRBC": 8.55,
    "SevereAnemiaRBC":9.55,
    "PolycythemiaRBC":11.55,
    "UL95CI_FemaleWBC": [5.2, 4.7],
    "UL95CI_FemaleHGB": [9.45, 8.55]
    },
    { 
    "time": "2024-02", 
    "Age":12,
    "sex":"female",
    "FemaleWBC": 4.46,
    "FemaleHGB": 8.1, 
    "NormalRBC": 3.645, 
    "MildAnemiaRBC": 5.265, 
    "ModerateAnemiaRBC": 7.695,
    "SevereAnemiaRBC":8.55,
    "PolycythemiaRBC":10.55,
    "UL95CI_FemaleWBC": [4.68, 4.23],
    "UL95CI_FemaleHGB": [8.51, 7.7]
    
    },
    { 
    "time": "2024-03", 
    "Age":12,
    "sex":"female",
    "FemaleWBC": 5.129,
    "FemaleHGB": 9.315, 
    "NormalRBC": 4.1925, 
    "MildAnemiaRBC": 6.1275, 
    "ModerateAnemiaRBC": 8.9325,
    "SevereAnemiaRBC":7.55,
    "PolycythemiaRBC":9.55,
    "UL95CI_FemaleWBC": [5.39, 4.87],
    "UL95CI_FemaleHGB": [9.78, 8.85]
    
    },
    { 
    "time": "2024-04", 
    "Age":12,
    "sex":"female",
    "FemaleWBC": 4.616,
    "FemaleHGB": 8.38, 
    "NormalRBC": 3.773, 
    "MildAnemiaRBC": 5.542, 
    "ModerateAnemiaRBC": 8.06,
    "SevereAnemiaRBC":6.55,
    "PolycythemiaRBC":8.55,
    "UL95CI_FemaleWBC": [4.85, 4.39],
    "UL95CI_FemaleHGB": [8.8, 7.96]
    },
    { 
    "time": "2024-05", 
    "Age":12,
    "sex":"female",
    "FemaleWBC": 5.7845,  
    "FemaleHGB": 9.64, 
    "NormalRBC": 4.338, 
    "MildAnemiaRBC": 6.373, 
    "ModerateAnemiaRBC": 9.28,
    "SevereAnemiaRBC":5.55,
    "PolycythemiaRBC":7.55,
    "UL95CI_FemaleWBC": [6.07, 5.5],
    "UL95CI_FemaleHGB": [10.12, 9.16]
    },
    { 
    "time": "2024-06", 
    "Age":12,
    "sex":"female",
    "FemaleWBC": 4.777,
    "FemaleHGB": 8.676, 
    "NormalRBC": 3.904, 
    "MildAnemiaRBC": 5.736, 
    "ModerateAnemiaRBC": 8.36,
    "SevereAnemiaRBC":4.55,
    "PolycythemiaRBC":6.55,
    "UL95CI_FemaleWBC": [5.02, 4.54],
    "UL95CI_FemaleHGB": [9.11, 8.24]
    },
    { 
    "time": "2024-07", 
    "Age":12,
    "sex":"female",
    "FemaleWBC": 5.493,
    "FemaleHGB": 9.977, 
    "NormalRBC": 4.49, 
    "MildAnemiaRBC": 6.6, 
    "ModerateAnemiaRBC": 9.6,
    "SevereAnemiaRBC":9.55,
    "PolycythemiaRBC":11.55,
    "UL95CI_FemaleWBC": [5.77, 5.22],
    "UL95CI_FemaleHGB": [10.48, 9.48]
    },
    { 
    "time": "2024-08", 
    "Age":12,
    "sex":"female",
    "FemaleWBC": 5.387,
    "FemaleHGB": 8.979, 
    "NormalRBC": 4.041, 
    "MildAnemiaRBC": 5.94, 
    "ModerateAnemiaRBC": 8.64,
    "SevereAnemiaRBC":10.55,
    "PolycythemiaRBC":12.55,
    "UL95CI_FemaleWBC": [5.66, 5.11],
    "UL95CI_FemaleHGB": [9.43, 8.53]
    },
    { 
    "time": "2024-09", 
    "Age":12,
    "sex":"female",
    "FemaleWBC": 5.685,
    "FemaleHGB": 10.33, 
    "NormalRBC": 4.647, 
    "MildAnemiaRBC": 6.837, 
    "ModerateAnemiaRBC": 9.945,
    "SevereAnemiaRBC":11.55,
    "PolycythemiaRBC":13.55,
    "UL95CI_FemaleWBC": [5.97, 5.4],
    "UL95CI_FemaleHGB": [10.85, 9.81]
    },
    { 
    "time": "2024-10", 
    "Age":12,
    "sex":"female",
    "FemaleWBC": 5.116,
    "FemaleHGB": 9.297, 
    "NormalRBC": 4.182, 
    "MildAnemiaRBC": 6.156, 
    "ModerateAnemiaRBC": 8.964,
    "SevereAnemiaRBC":9.55,
    "PolycythemiaRBC":11.55,
    "UL95CI_FemaleWBC": [5.37, 4.86],
    "UL95CI_FemaleHGB": [9.76, 8.83]
    },
    
{ 
    "time": "2024-02", 
    "Age":32,
    "sex":"all",
    "MaleWBC": 5.4,  
    "FemaleWBC": 4.95,
    "MaleHGB": 12.6, 
    "FemaleHGB": 9, 
    "NormalRBC": 4.05, 
    "MildAnemiaRBC": 5.85, 
    "ModerateAnemiaRBC": 8.55,
    "SevereAnemiaRBC":9.55,
    "PolycythemiaRBC":11.55,
    "UL95CI_MaleWBC": [5.67, 5.13],
    "UL95CI_FemaleWBC": [5.2, 4.7],
    "UL95CI_MaleHGB": [13.23, 11.97],
    "UL95CI_FemaleHGB": [9.45, 8.55]
    },
    { 
    "time": "2024-03", 
    "Age":32,
    "sex":"all",
    "MaleWBC": 4.86,  
    "FemaleWBC": 4.46,
    "MaleHGB": 11.34, 
    "FemaleHGB": 8.1, 
    "NormalRBC": 3.645, 
    "MildAnemiaRBC": 5.265, 
    "ModerateAnemiaRBC": 7.695,
    "SevereAnemiaRBC":8.55,
    "PolycythemiaRBC":10.55,
    "UL95CI_MaleWBC": [5.1, 4.62],
    "UL95CI_FemaleWBC": [4.68, 4.23],
    "UL95CI_MaleHGB": [11.91, 10.78],
    "UL95CI_FemaleHGB": [8.51, 7.7]
    
    },
    { 
    "time": "2024-04", 
    "Age":32,
    "sex":"all",
    "MaleWBC": 5.589,  
    "FemaleWBC": 5.129,
    "MaleHGB": 13.04, 
    "FemaleHGB": 9.315, 
    "NormalRBC": 4.1925, 
    "MildAnemiaRBC": 6.1275, 
    "ModerateAnemiaRBC": 8.9325,
    "SevereAnemiaRBC":7.55,
    "PolycythemiaRBC":9.55,
    "UL95CI_MaleWBC": [5.87, 5.31],
    "UL95CI_FemaleWBC": [5.39, 4.87],
    "UL95CI_MaleHGB": [13.69, 12.39],
    "UL95CI_FemaleHGB": [9.78, 8.85]
    
    },
    { 
    "time": "2024-05", 
    "Age":32,
    "sex":"all",
    "MaleWBC": 5.03,  
    "FemaleWBC": 4.616,
    "MaleHGB": 11.74, 
    "FemaleHGB": 8.38, 
    "NormalRBC": 3.773, 
    "MildAnemiaRBC": 5.542, 
    "ModerateAnemiaRBC": 8.06,
    "SevereAnemiaRBC":6.55,
    "PolycythemiaRBC":8.55,
    "UL95CI_MaleWBC": [5.28, 4.78],
    "UL95CI_FemaleWBC": [4.85, 4.39],
    "UL95CI_MaleHGB": [12.33, 11.15],
    "UL95CI_FemaleHGB": [8.8, 7.96]
    },
    { 
    "time": "2024-06", 
    "Age":32,
    "sex":"all",
    "MaleWBC": 5.308,
    "FemaleWBC": 5.7845,  
    "MaleHGB": 13.5, 
    "FemaleHGB": 9.64, 
    "NormalRBC": 4.338, 
    "MildAnemiaRBC": 6.373, 
    "ModerateAnemiaRBC": 9.28,
    "SevereAnemiaRBC":5.55,
    "PolycythemiaRBC":7.55,
    "UL95CI_MaleWBC": [5.57, 5.04],
    "UL95CI_FemaleWBC": [6.07, 5.5],
    "UL95CI_MaleHGB": [14.18, 12.83],
    "UL95CI_FemaleHGB": [10.12, 9.16]
    },
    { 
    "time": "2024-07", 
    "Age":32,
    "sex":"all",
    "MaleWBC": 5.206,  
    "FemaleWBC": 4.777,
    "MaleHGB": 12.15, 
    "FemaleHGB": 8.676, 
    "NormalRBC": 3.904, 
    "MildAnemiaRBC": 5.736, 
    "ModerateAnemiaRBC": 8.36,
    "SevereAnemiaRBC":4.55,
    "PolycythemiaRBC":6.55,
    "UL95CI_MaleWBC": [5.47, 4.94],
    "UL95CI_FemaleWBC": [5.02, 4.54],
    "UL95CI_MaleHGB": [12.76, 11.55],
    "UL95CI_FemaleHGB": [9.11, 8.24]
    },
    { 
    "time": "2024-08", 
    "Age":32,
    "sex":"all",
    "MaleWBC": 5.986,  
    "FemaleWBC": 5.493,
    "MaleHGB": 13.97, 
    "FemaleHGB": 9.977, 
    "NormalRBC": 4.49, 
    "MildAnemiaRBC": 6.6, 
    "ModerateAnemiaRBC": 9.6,
    "SevereAnemiaRBC":9.55,
    "PolycythemiaRBC":11.55,
    "UL95CI_MaleWBC": [6.29, 5.69],
    "UL95CI_FemaleWBC": [5.77, 5.22],
    "UL95CI_MaleHGB": [14.66, 13.27],
    "UL95CI_FemaleHGB": [10.48, 9.48]
    },
    { 
    "time": "2024-09", 
    "Age":32,
    "sex":"all",
    "MaleWBC":  4.944,
    "FemaleWBC": 5.387,
    "MaleHGB": 12.58, 
    "FemaleHGB": 8.979, 
    "NormalRBC": 4.041, 
    "MildAnemiaRBC": 5.94, 
    "ModerateAnemiaRBC": 8.64,
    "SevereAnemiaRBC":10.55,
    "PolycythemiaRBC":12.55,
    "UL95CI_MaleWBC": [5.19, 4.7],
    "UL95CI_FemaleWBC": [5.66, 5.11],
    "UL95CI_MaleHGB": [13.21, 11.95],
    "UL95CI_FemaleHGB": [9.43, 8.53]
    },
    { 
    "time": "2024-10", 
    "Age":32,
    "sex":"all",
    "MaleWBC": 6.195,  
    "FemaleWBC": 5.685,
    "MaleHGB": 14.47, 
    "FemaleHGB": 10.33, 
    "NormalRBC": 4.647, 
    "MildAnemiaRBC": 6.837, 
    "ModerateAnemiaRBC": 9.945,
    "SevereAnemiaRBC":11.55,
    "PolycythemiaRBC":13.55,
    "UL95CI_MaleWBC": [6.51, 5.88],
    "UL95CI_FemaleWBC": [5.97, 5.4],
    "UL95CI_MaleHGB": [15.19, 13.74],
    "UL95CI_FemaleHGB": [10.85, 9.81]
    },
    { 
    "time": "2024-11", 
    "Age":32,
    "sex":"all",
    "MaleWBC": 5.575,  
    "FemaleWBC": 5.116,
    "MaleHGB": 13.02, 
    "FemaleHGB": 9.297, 
    "NormalRBC": 4.182, 
    "MildAnemiaRBC": 6.156, 
    "ModerateAnemiaRBC": 8.964,
    "SevereAnemiaRBC":9.55,
    "PolycythemiaRBC":11.55,
    "UL95CI_MaleWBC": [5.85, 5.29],
    "UL95CI_FemaleWBC": [5.37, 4.86],
    "UL95CI_MaleHGB": [13.67, 12.37],
    "UL95CI_FemaleHGB": [9.76, 8.83]
    },
    { 
    "time": "2024-01", 
    "Age":32,
    "sex":"male",
    "MaleWBC": 5.4,  
    "MaleHGB": 12.6, 
    "NormalRBC": 4.05, 
    "MildAnemiaRBC": 5.85, 
    "ModerateAnemiaRBC": 8.55,
    "SevereAnemiaRBC":9.55,
    "PolycythemiaRBC":11.55,
    "UL95CI_MaleWBC": [5.67, 5.13],
    "UL95CI_MaleHGB": [13.23, 11.97],
    },
    { 
    "time": "2024-02", 
    "Age":32,
    "sex":"male",
    "MaleWBC": 4.86,  
    "MaleHGB": 11.34, 
    "NormalRBC": 3.645, 
    "MildAnemiaRBC": 5.265, 
    "ModerateAnemiaRBC": 7.695,
    "SevereAnemiaRBC":8.55,
    "PolycythemiaRBC":10.55,
    "UL95CI_MaleWBC": [5.1, 4.62],
    "UL95CI_MaleHGB": [11.91, 10.78],
    
    },
    { 
    "time": "2024-03", 
    "Age":32,
    "sex":"male",
    "MaleWBC": 5.589,  
    "MaleHGB": 13.04, 
    "NormalRBC": 4.1925, 
    "MildAnemiaRBC": 6.1275, 
    "ModerateAnemiaRBC": 8.9325,
    "SevereAnemiaRBC":7.55,
    "PolycythemiaRBC":9.55,
    "UL95CI_MaleWBC": [5.87, 5.31],
    "UL95CI_MaleHGB": [13.69, 12.39],
    
    },
    { 
    "time": "2024-04", 
    "Age":32,
    "sex":"male",
    "MaleWBC": 5.03,  
    "MaleHGB": 11.74, 
    "NormalRBC": 3.773, 
    "MildAnemiaRBC": 5.542, 
    "ModerateAnemiaRBC": 8.06,
    "SevereAnemiaRBC":6.55,
    "PolycythemiaRBC":8.55,
    "UL95CI_MaleWBC": [5.28, 4.78],
    "UL95CI_MaleHGB": [12.33, 11.15],
    },
    { 
    "time": "2024-05", 
    "Age":32,
    "sex":"male",
    "MaleWBC": 5.308,
    "MaleHGB": 13.5, 
    "NormalRBC": 4.338, 
    "MildAnemiaRBC": 6.373, 
    "ModerateAnemiaRBC": 9.28,
    "SevereAnemiaRBC":5.55,
    "PolycythemiaRBC":7.55,
    "UL95CI_MaleWBC": [5.57, 5.04],
    "UL95CI_MaleHGB": [14.18, 12.83],
    },
    { 
    "time": "2024-06", 
    "Age":32,
    "sex":"male",
    "MaleWBC": 5.206,  
    "MaleHGB": 12.15, 
    "NormalRBC": 3.904, 
    "MildAnemiaRBC": 5.736, 
    "ModerateAnemiaRBC": 8.36,
    "SevereAnemiaRBC":4.55,
    "PolycythemiaRBC":6.55,
    "UL95CI_MaleWBC": [5.47, 4.94],
    "UL95CI_MaleHGB": [12.76, 11.55],
    },
    { 
    "time": "2024-07", 
    "Age":32,
    "sex":"male",
    "MaleWBC": 5.986,  
    "MaleHGB": 13.97, 
    "NormalRBC": 4.49, 
    "MildAnemiaRBC": 6.6, 
    "ModerateAnemiaRBC": 9.6,
    "SevereAnemiaRBC":9.55,
    "PolycythemiaRBC":11.55,
    "UL95CI_MaleWBC": [6.29, 5.69],
    "UL95CI_MaleHGB": [14.66, 13.27],
    },
    { 
    "time": "2024-08", 
    "Age":32,
    "sex":"male",
    "MaleWBC":  4.944,
    "MaleHGB": 12.58, 
    "NormalRBC": 4.041, 
    "MildAnemiaRBC": 5.94, 
    "ModerateAnemiaRBC": 8.64,
    "SevereAnemiaRBC":10.55,
    "PolycythemiaRBC":12.55,
    "UL95CI_MaleWBC": [5.19, 4.7],
    "UL95CI_MaleHGB": [13.21, 11.95],
    },
    { 
    "time": "2024-09", 
    "Age":32,
    "sex":"male",
    "MaleWBC": 6.195,  
    "MaleHGB": 14.47, 
    "NormalRBC": 4.647, 
    "MildAnemiaRBC": 6.837, 
    "ModerateAnemiaRBC": 9.945,
    "SevereAnemiaRBC":11.55,
    "PolycythemiaRBC":13.55,
    "UL95CI_MaleWBC": [6.51, 5.88],
    "UL95CI_MaleHGB": [15.19, 13.74],
    },
    { 
    "time": "2024-10", 
    "Age":32,
    "sex":"male",
    "MaleWBC": 5.575,  
    "MaleHGB": 13.02, 
    "NormalRBC": 4.182, 
    "MildAnemiaRBC": 6.156, 
    "ModerateAnemiaRBC": 8.964,
    "SevereAnemiaRBC":9.55,
    "PolycythemiaRBC":11.55,
    "UL95CI_MaleWBC": [5.85, 5.29],
    "UL95CI_MaleHGB": [13.67, 12.37],
    },
        { 
        "time": "2024-02", 
        "Age":32,
        "sex":"female",
        "FemaleWBC": 4.95,
        "FemaleHGB": 9, 
        "NormalRBC": 4.05, 
        "MildAnemiaRBC": 5.85, 
        "ModerateAnemiaRBC": 8.55,
        "SevereAnemiaRBC":9.55,
        "PolycythemiaRBC":11.55,
        "UL95CI_FemaleWBC": [5.2, 4.7],
        "UL95CI_FemaleHGB": [9.45, 8.55]
        },
        { 
        "time": "2024-03", 
        "Age":32,
        "sex":"female",
        "FemaleWBC": 4.46,
        "FemaleHGB": 8.1, 
        "NormalRBC": 3.645, 
        "MildAnemiaRBC": 5.265, 
        "ModerateAnemiaRBC": 7.695,
        "SevereAnemiaRBC":8.55,
        "PolycythemiaRBC":10.55,
        "UL95CI_FemaleWBC": [4.68, 4.23],
        "UL95CI_FemaleHGB": [8.51, 7.7]
        
        },
        { 
        "time": "2024-04", 
        "Age":32,
        "sex":"female",
        "FemaleWBC": 5.129,
        "FemaleHGB": 9.315, 
        "NormalRBC": 4.1925, 
        "MildAnemiaRBC": 6.1275, 
        "ModerateAnemiaRBC": 8.9325,
        "SevereAnemiaRBC":7.55,
        "PolycythemiaRBC":9.55,
        "UL95CI_FemaleWBC": [5.39, 4.87],
        "UL95CI_FemaleHGB": [9.78, 8.85]
        
        },
        { 
        "time": "2024-05", 
        "Age":32,
        "sex":"female",
        "FemaleWBC": 4.616,
        "FemaleHGB": 8.38, 
        "NormalRBC": 3.773, 
        "MildAnemiaRBC": 5.542, 
        "ModerateAnemiaRBC": 8.06,
        "SevereAnemiaRBC":6.55,
        "PolycythemiaRBC":8.55,
        "UL95CI_FemaleWBC": [4.85, 4.39],
        "UL95CI_FemaleHGB": [8.8, 7.96]
        },
        { 
        "time": "2024-06", 
        "Age":32,
        "sex":"female",
        "FemaleWBC": 5.7845,  
        "FemaleHGB": 9.64, 
        "NormalRBC": 4.338, 
        "MildAnemiaRBC": 6.373, 
        "ModerateAnemiaRBC": 9.28,
        "SevereAnemiaRBC":5.55,
        "PolycythemiaRBC":7.55,
        "UL95CI_FemaleWBC": [6.07, 5.5],
        "UL95CI_FemaleHGB": [10.12, 9.16]
        },
        { 
        "time": "2024-07", 
        "Age":32,
        "sex":"female",
        "FemaleWBC": 4.777,
        "FemaleHGB": 8.676, 
        "NormalRBC": 3.904, 
        "MildAnemiaRBC": 5.736, 
        "ModerateAnemiaRBC": 8.36,
        "SevereAnemiaRBC":4.55,
        "PolycythemiaRBC":6.55,
        "UL95CI_FemaleWBC": [5.02, 4.54],
        "UL95CI_FemaleHGB": [9.11, 8.24]
        },
        { 
        "time": "2024-08", 
        "Age":32,
        "sex":"female",
        "FemaleWBC": 5.493,
        "FemaleHGB": 9.977, 
        "NormalRBC": 4.49, 
        "MildAnemiaRBC": 6.6, 
        "ModerateAnemiaRBC": 9.6,
        "SevereAnemiaRBC":9.55,
        "PolycythemiaRBC":11.55,
        "UL95CI_FemaleWBC": [5.77, 5.22],
        "UL95CI_FemaleHGB": [10.48, 9.48]
        },
        { 
        "time": "2024-09", 
        "Age":32,
        "sex":"female",
        "FemaleWBC": 5.387,
        "FemaleHGB": 8.979, 
        "NormalRBC": 4.041, 
        "MildAnemiaRBC": 5.94, 
        "ModerateAnemiaRBC": 8.64,
        "SevereAnemiaRBC":10.55,
        "PolycythemiaRBC":12.55,
        "UL95CI_FemaleWBC": [5.66, 5.11],
        "UL95CI_FemaleHGB": [9.43, 8.53]
        },
        { 
        "time": "2024-10", 
        "Age":32,
        "sex":"female",
        "FemaleWBC": 5.685,
        "FemaleHGB": 10.33, 
        "NormalRBC": 4.647, 
        "MildAnemiaRBC": 6.837, 
        "ModerateAnemiaRBC": 9.945,
        "SevereAnemiaRBC":11.55,
        "PolycythemiaRBC":13.55,
        "UL95CI_FemaleWBC": [5.97, 5.4],
        "UL95CI_FemaleHGB": [10.85, 9.81]
        },
        { 
        "time": "2024-11", 
        "Age":32,
        "sex":"female",
        "FemaleWBC": 5.116,
        "FemaleHGB": 9.297, 
        "NormalRBC": 4.182, 
        "MildAnemiaRBC": 6.156, 
        "ModerateAnemiaRBC": 8.964,
        "SevereAnemiaRBC":9.55,
        "PolycythemiaRBC":11.55,
        "UL95CI_FemaleWBC": [5.37, 4.86],
        "UL95CI_FemaleHGB": [9.76, 8.83]
        },
];

const ControlAndDisplay: React.FC = () => {

       
   

    const [state, setState] = React.useState({
        ageopen:false,
        agevalue:"Minor(<18)",
        sexopen: false,
        sexvalue: "all",
        BMIopen: false,
        BMIvalue: "",
        Ethnicityopen: false,
        Ethnicityvalue: ""
    });
    
   
 

    const [selectedFilters, setSelectedFilters] = useState<string[]>([]);
    const [selectedMetric, setSelectedMetric] = useState('WBC');
    //const [sex] = useState('');
    // const [filteredData, setFilteredData] = useState(initialDummyData);
    
   
    const monthFormat = 'YYYY/MM';
    const [fromDate, setFromDate] = useState(moment("2024/01", monthFormat).toDate());
    const [toDate, setToDate] = useState(moment("2024/10", monthFormat).toDate());

    const filteredData = useMemo(() => {
        let filtered = initialDummyData;
    
        // 日期筛选
        if (fromDate || toDate) {
            filtered = filtered.filter((d) => {
                const date = new Date(d.time);
        
                if (fromDate && !toDate) {
                    // Only fromDate is provided, filter dates after or on fromDate
                    return date >= moment(fromDate).startOf('month').toDate();
                }
        
                if (!fromDate && toDate) {
                    // Only toDate is provided, filter dates before or on toDate
                    return date <= moment(toDate).endOf('month').toDate();
                }
        
                // Both fromDate and toDate are provided, filter within range
                return isWithinInterval(date, {
                    start: moment(fromDate).startOf('month').toDate(),
                    end: moment(toDate).endOf('month').toDate(),
                });
            });
        }

        // 年龄筛选
        if (!state.agevalue) {
            return [];
        }
        const selectedAge = state.agevalue;
        filtered = filtered.filter((data) => {
                const age = data.Age;
                if (selectedAge === "Minor(<18)" && age < 18) {
                    return true;
                } else if (selectedAge === "Adults(18-65)" && age >= 18 && age <= 65) {
                    return true;
                } else if (selectedAge === "Elderly(>65)" && age > 65) {
                    return true;
                }
                return false;
            });
        
    
        // 性别筛选
        if (state.sexvalue) {
            const selectedSex = state.sexvalue;
            filtered = filtered.filter((data) => data.sex === selectedSex);
        }
    
        return filtered;
    }, [fromDate, toDate, initialDummyData, state.agevalue, state.sexvalue]);
    
    
    const SelectPopover = ({ open, onOpenChange, value, onSelect, options, placeholder, noOptionsText }) => (
        <Popover open={open} onOpenChange={onOpenChange}>
            <PopoverTrigger asChild>
                <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={open}
                    className="h-18 px-12 py-4 border rounded-lg shadow-md text-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
                >
                    {value ? options.find(option => option.value === value)?.label : placeholder}
                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[auto] p-0">
                <Command>
                    <CommandList>
                        <CommandEmpty>{noOptionsText}</CommandEmpty>
                        <CommandGroup>
                            {options.map(option => (
                                <CommandItem
                                    key={option.value}
                                    value={option.value}
                                    onSelect={currentValue => {
                                        onSelect( currentValue);
                                    }}
                                >
                                    <Check
                                        className={cn(
                                            "mr-2 h-4 w-4",
                                            value === option.value ? "opacity-100" : "opacity-0"
                                        )}
                                    />
                                    {option.label}
                                </CommandItem>
                            ))}
                        </CommandGroup>
                    </CommandList>
                </Command>
            </PopoverContent>
        </Popover>
    );

    // const handleFilterApply = () => {
    //     const newFilter = `Sex: ${sex}`;
    //     if (!selectedFilters.includes(newFilter) && sex) {
    //         setSelectedFilters((prev) => [...prev, newFilter]);
    //     }

    //     // Apply filtering based on the selected sex
    //     const newFilteredData = initialDummyData.filter((item) => !sex || item.sex === sex);
    //     setFilteredData(newFilteredData);
    // };

    const handleMetricChange = (newValue: string) => {  
        setSelectedMetric(newValue);  
    }; 
    // const handleMetricChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    //     setSelectedMetric(event.target.value);
    // };

    // const handleSexChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    //     setSex(event.target.value as string);
    // };
    
    return (
        <Box sx={{ padding: 2}}>

            {/* Top Section: Filters */}
            <Card className="w-[auto] mb-4">
                <CardHeader>
                    <CardTitle>Control Panel</CardTitle>
                </CardHeader>
                <CardContent  className="flex flex-col space-y-4 md:flex-row md:space-y-0 md:space-x-4">
                <SelectPopover 
                            open={state.ageopen} 
                            onOpenChange={open => setState(prev => ({ ...prev, ageopen: open }))}
                            value={state.agevalue}
                            onSelect={newValue => setState(prev => ({ ...prev, agevalue: newValue, ageopen: false }))}
                            options={Ages}
                            placeholder="Select age"
                            noOptionsText="No age found."
                        />

                        <SelectPopover 
                            open={state.sexopen} 
                            onOpenChange={open => setState(prev => ({ ...prev, sexopen: open }))}
                            value={state.sexvalue}
                            onSelect={newValue => setState(prev => ({ ...prev, sexvalue: newValue, sexopen: false }))}
                            options={sexs}
                            placeholder="Select sex"
                            noOptionsText="No sex found."
                        />

                        <SelectPopover 
                            open={state.BMIopen} 
                            onOpenChange={open => setState(prev => ({ ...prev, BMIopen: open }))}
                            value={state.BMIvalue}
                            onSelect={newValue => setState(prev => ({ ...prev, BMIvalue: newValue, BMIopen: false }))}
                            options={BMIs}
                            placeholder="Select BMI"
                            noOptionsText="No BMI found."
                        />

                        <SelectPopover 
                            open={state.Ethnicityopen} 
                            onOpenChange={open => setState(prev => ({ ...prev, Ethnicityopen: open }))}
                            value={state.Ethnicityvalue}
                            onSelect={newValue => setState(prev => ({ ...prev, Ethnicityvalue: newValue, Ethnicityopen: false }))}
                            options={Ethnicitys}
                            placeholder="Select Ethnicity"
                            noOptionsText="No Ethnicity found."
                        />

                            {/* From Month Picker */}
                            <div>
                                <DatePicker
                                    className="h-18 w-40 px-4 py-4 border rounded-lg shadow-md text-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
                                    selected={fromDate}
                                    onChange={(date) => {
                                        setFromDate(date);
                                        if (toDate && date > toDate) {
                                            setToDate(null);
                                        }
                                    }}
                                    showMonthYearPicker
                                    dateFormat="yyyy/MM"
                                    placeholderText="Pick a start month"
                                />
                            </div>

                            {/* To Month Picker */}
                            <div>
                                <DatePicker
                                    className="h-18 w-40 px-4 py-4 border rounded-lg shadow-md text-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
                                    selected={toDate}
                                    onChange={(date) => {
                                        setToDate(date);
                                        if (fromDate && date < fromDate) {
                                            setFromDate(null);
                                        }
                                    }}
                                    showMonthYearPicker
                                    dateFormat="yyyy/MM"
                                    placeholderText="Pick an end month"
                                />
                            </div>
                   
                            
                </CardContent>
                <CardFooter className="flex flex-col space-y-4 md:flex-row md:space-y-0 md:space-x-4">
                Chips:<u></u>
                        {state.agevalue && (
                                    <Badge variant="outline" className="flex items-center w-[auto]">
                                    Age: {Ages.find((age) => age.value === state.agevalue)?.label}
                                    <button
                                        className="ml-4 h-6 w-4 text-gray-500 hover:text-gray-700 focus:outline-none"
                                        onClick={() => setState(prev => ({ ...prev, agevalue: "" }))}
                                    >
                                        X
                                    </button>
                                    </Badge>
                                )}
                       {state.sexvalue && state.sexvalue !== "all" && (
                                <Badge variant="outline" className="flex items-center w-[auto]">
                                    Sex: {sexs.find((sex) => sex.value === state.sexvalue)?.label}
                                    <button
                                    className="ml-4 h-6 w-4 text-gray-500 hover:text-gray-700 focus:outline-none"
                                    onClick={() => setState((prev) => ({ ...prev, sexvalue: "all" }))}
                                    >
                                    X
                                    </button>
                                </Badge>
                        )}

                        {/* 这是一个条件渲染语句。
                        只有当 state.BMIvalue 不为空时，才会渲染 Badge 组件，表示当用户选择了某个 BMI 选项时，显示该选项。 */}
                        {state.BMIvalue && (
                            <Badge variant="outline" className="flex items-center w-[auto]">
                            BMI: {BMIs.find((bmi) => bmi.value === state.BMIvalue)?.label}{/* 这是badge显示的文本，BMI: 之后跟着选中的 BMI 标签。 */}
                            <button
                                className="ml-4 h-6 w-4 text-gray-500 hover:text-gray-700 focus:outline-none"
                                onClick={() => setState(prev => ({ ...prev, BMIvalue: "" }))}
                                //当用户点击按钮时，会触发 onClick 事件。
                                //在事件回调中，调用 setState，将 BMIvalue 设置为空字符串（""），表示取消当前选中的 BMI 值。
                                //取消后，Badge 组件将不再显示，因为 state.BMIvalue 为空，Badge不会再渲染。
                            >
                                X
                            </button>
                            </Badge>
                        )}

                        {state.Ethnicityvalue && (
                            <Badge variant="outline" className="flex items-center w-[auto]">
                            Ethnicity: {Ethnicitys.find((Ethnicity) => Ethnicity.value === state.Ethnicityvalue)?.label}
                            <button
                                className="ml-4 h-6 w-4 text-gray-500 hover:text-gray-700 focus:outline-none"
                                onClick={() => setState(prev => ({ ...prev, Ethnicityvalue: "" }))}
                            >
                                X
                            </button>
                            </Badge>
                        )}
                         {fromDate && (
                            <Badge variant="outline" className="flex items-center">
                                From Date: {moment(fromDate).format(monthFormat)}
                                <button
                                    className="ml-4 h-6 w-4 text-gray-500 hover:text-gray-700 focus:outline-none"
                                    onClick={() => setFromDate(null)}
                                >
                                    X
                                </button>
                            </Badge>
                        )}

                        {toDate && (
                            <Badge variant="outline" className="flex items-center">
                                To Date: {moment(toDate).format(monthFormat)}
                                <button
                                    className="ml-4 h-6 w-4 text-gray-500 hover:text-gray-700 focus:outline-none"
                                    onClick={() => setToDate(null)}
                                >
                                    X
                                </button>
                            </Badge>
                        )}
                </CardFooter>
            </Card>

            {/* Bottom Section */}
           
            <Card >
                <CardHeader>
                    <CardTitle >Trends</CardTitle>
                    <CardDescription ></CardDescription>

                </CardHeader>
                <CardContent className="flex flex-col space-y-4 md:flex-row md:space-y-0 md:space-x-4">
                    {/* Left Side: Top 5 Diagnosis Methods */}
                    <Card className="w-[500px] h-[auto]">
                        <CardHeader>
                            <CardTitle>Top 5 Diagnosis Methods</CardTitle>
                            <CardDescription>Card Description</CardDescription>
                        </CardHeader>
                        <CardContent>
                                <Table className="w-full">
                                    <TableHeader>
                                    <TableRow>
                                        <TableHead className="font-semibold text-left pl-4">Diagnosis</TableHead>
                                        <TableHead className="font-semibold text-right pr-4">Count</TableHead>
                                        {/* 表头部分，定义了 "Diagnosis"（诊断名称）和 "Count"（计数）两列，分别显示诊断方法及其对应的计数。 */}
                                    </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                    {diagnosis.map((diagnosi) => (
                                        //通过 diagnosis.map() 遍历诊断数据，并为每个诊断生成一行数据。
                                        <TableRow key={diagnosi.diagnosis} className="hover:bg-gray-50">
                                        <TableCell className="flex items-center space-x-2 pl-4 py-4"> 
                                            <Badge  
                                            style={{       
                                                backgroundColor: getBadgeColor(diagnosi.diagnosis), 
                                            }}
                                            />
                                            <span className="font-medium">{diagnosi.diagnosis}</span>
                                            <AlertDialog>
                                                <AlertDialogTrigger>...</AlertDialogTrigger>
                                                {/* 对话框的触发器，这里用 ... 作为触发元素，点击后会弹出对话框。 */}
                                                <AlertDialogContent>
                                                    <AlertDialogHeader>
                                                    <AlertDialogTitle> This is {diagnosi.diagnosis}'s diagnosis.</AlertDialogTitle>
                                                    <AlertDialogDescription>
                                                        This is {diagnosi.diagnosis}'s diagnosis.
                                                    </AlertDialogDescription>
                                                    </AlertDialogHeader>
                                                    <AlertDialogFooter>
                                                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                                                    </AlertDialogFooter>
                                                </AlertDialogContent>
                                                </AlertDialog>
                                        </TableCell>
                                        <TableCell className="text-right pr-4 py-4 font-medium"> 
                                            {diagnosi.count}
                                        </TableCell>
                                        </TableRow>
                                    ))}
                                    </TableBody>
                                </Table>
                            </CardContent>
                    </Card>
                    

                    {/*  Chart */}
                    <Card className="chart-card">
                        <CardHeader className="card-header">
                            <CardTitle className="card-title">Chart</CardTitle>
                            <CardDescription className="card-description">This is chart</CardDescription>
                        </CardHeader>
                        <CardContent className="p-4 bg-white rounded-b-lg" >
                                <RadioGroup  
                                //用于提供指标的选择，用户可以选择 WBC（白细胞）、HGB（血红蛋白）、或 RBC（红细胞计数）。
                                className="flex space-x-2"
                                aria-label="metric"
                                name="metric"
                                value={selectedMetric} //当前选中的指标值，如 "WBC"、"HGB" 或 "RBC"。
                                onValueChange={handleMetricChange} //当用户选择不同的指标时，调用 handleMetricChange 函数更新 selectedMetric 的值。
                                > 
                                <div className="flex items-center space-x-2">
                                    <RadioGroupItem value="WBC" id="option-one" />
                                    <Label htmlFor="WBC">WBC</Label>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <RadioGroupItem value="HGB" id="option-two" />
                                    <Label htmlFor="HGB">HGB</Label>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <RadioGroupItem value="RBC" id="option-three" />
                                    <Label htmlFor="RBC">RBC</Label>
                                </div>
                                </RadioGroup>
                            <ChartContainer config={chartConfig} className="chart-container">
                                {/** Chart Component */}
                                <ComposedChart
                                    data={filteredData} //传入的数据源 filteredData，用于绘制图表。
                                    margin={{
                                        top: 10,
                                        right: 30,
                                        left: 30,
                                        bottom: 0,
                                    }}
                                    >
                                <CartesianGrid strokeDasharray="3 3" />
                                {/* 绘制图表的网格线，strokeDasharray="3 3" 表示网格线为虚线。 */}
                                <XAxis 
                                    dataKey="time"
                                    tickFormatter={(time, index) => {
                                        // 检查当前日期是否和前一个日期重复，若重复，则不显示
                                        if (index === 0 || time !== filteredData[index - 1].time) {
                                            return time; // 显示日期
                                        }
                                        return ""; // 重复时不显示刻度
                                    }}
                                />
                                {/* 设置 X 轴，dataKey="time" 表示 X 轴的数据来自数据源中的 time 字段。 */}
                                <YAxis label={{ value: selectedMetric, angle: -90, position: 'insideLeft', textAnchor: 'middle' }} domain={['auto', 'auto']}/>
                                {/* 设置 Y 轴，label 属性用于设置 Y 轴的标签，selectedMetric 动态指定标签内容。domain={['auto', 'auto']} 使 Y 轴的范围自动调整。 */}
                                <Tooltip  />
                                <Legend  />
                                    {selectedMetric === "WBC" && (
                                        <>
                                        {/* 如果 selectedMetric 为 "WBC"，则绘制表示男性和女性白细胞计数的数据。
                                        Area 元素绘制填充区域，Line 元素绘制线条，分别用不同颜色表示不同的数据。 */}
                                        <Area  dataKey={`UL95CI_Male${selectedMetric}`} stroke="#8884d8" fill="#FFC125"/>
                                        <Line  dataKey={`Male${selectedMetric}`} stroke="#CD5555" />
                                        <Area  dataKey={`UL95CI_Female${selectedMetric}`} stroke="#8884d8" fill="#8884d8"/>
                                        <Line  dataKey={`Female${selectedMetric}`} stroke="#1874CD" />
                                      </>
                                    )}
                                     {selectedMetric === "HGB" && (
                                        <>
                                        {/* 如果 selectedMetric 为 "HGB"，图表内容与 WBC 类似，但显示的是血红蛋白数据。 */}
                                        <Area  dataKey={`UL95CI_Male${selectedMetric}`} stroke="#8884d8" fill="#FFC125"/>
                                        <Line  dataKey={`Male${selectedMetric}`} stroke="#CD5555" />
                                        <Area  dataKey={`UL95CI_Female${selectedMetric}`} stroke="#8884d8" fill="#8884d8"/>
                                        <Line  dataKey={`Female${selectedMetric}`} stroke="#1874CD" />
                                        </>
                                    )}
                                    {selectedMetric === "RBC" && (
                                        <>
                                        {/* 如果 selectedMetric 为 "RBC"，图表显示多条线条，分别表示正常和不同程度贫血等情况。 */}
                                        <Line  dataKey={`Normal${selectedMetric}`} stroke="#228B22" />
                                        <Line  dataKey={`MildAnemia${selectedMetric}`} stroke="#EEEE00" />
                                        <Line  dataKey={`ModerateAnemia${selectedMetric}`} stroke="#EE7942" />
                                        <Line  dataKey={`SevereAnemia${selectedMetric}`} stroke="#FF0000" />
                                        <Line  dataKey={`Polycythemia${selectedMetric}`} stroke="#8A2BE2" />
                                        </>
                                    )}
                                    </ComposedChart>
                            </ChartContainer>
                        </CardContent>
                    </Card>
                </CardContent>
            </Card>

        </Box>
    );
};

export default ControlAndDisplay;



import React, { useState,useMemo } from 'react';
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
import { DateRange } from "react-day-picker"
import { Calendar } from "@/components/ui/calendar"
import { Badge } from "@/components/ui/badge"
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
      value: "other",
      label: "Other",
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

  
const initialDummyData = [{ 
    "time": "2024-01", 
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
}
];

const ControlAndDisplay: React.FC = () => {

    

      const [age, setAge] = useState("");
      const handleAgeChange = (e: { target: { value: any; }; }) => {
        let agevalue = e.target.value;
        if (agevalue < 0) {
          agevalue = 0;
        } else if (agevalue > 120) {
          agevalue = 120;
        }
    
        setAge(agevalue);
    };

        
    const [sexopen, setsexOpen] = React.useState(false)
    const [sexvalue, setsexValue] = React.useState("")

    const [BMIopen, setBMIOpen] = React.useState(false)
    const [BMIvalue, setBMIValue] = React.useState("")

    const [Ethnicityopen, setEthnicityOpen] = React.useState(false)
    const [Ethnicityvalue, setEthnicityValue] = React.useState("")

    const [selectedFilters, setSelectedFilters] = useState<string[]>([]);
    const [selectedMetric, setSelectedMetric] = useState('WBC');
    //const [sex] = useState('');
    // const [filteredData, setFilteredData] = useState(initialDummyData);
    
    const [date, setDate] = useState(null);

    const filteredData = useMemo(() => {
      if (date?.from && date?.to) {
        return initialDummyData.filter((d) =>
          isWithinInterval(new Date(d.time), { start: date.from, end: date.to })
        );
      }
      return initialDummyData; // If no date is selected, show all data
    }, [date, initialDummyData]);

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
            <Card>
                <CardHeader>
                    <CardTitle>Control Panel</CardTitle>
                    <CardDescription>Card Description</CardDescription>
                </CardHeader>
                <CardContent className="flex space-x-4">

                    {/**Age */}
                    <input  
                        className='w-[100px]'  
                        type="number"  
                        placeholder="Age" 
                        min={0}
                        max={120} 
                        value={age}
                        onChange={handleAgeChange} 
                        />  

                    {/**Select Sex */}
                    <Popover open={sexopen} onOpenChange={setsexOpen}>
                        <PopoverTrigger asChild>
                            <Button
                            variant="outline"
                            role="combobox"
                            aria-expanded={sexopen}
                            className="w-[200px] justify-between"
                            >
                            {sexvalue
                                ? sexs.find((sex) => sex.value === sexvalue)?.label
                                : "Select sex"}
                            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-[200px] p-0">
                            <Command>
                            <CommandList>
                                <CommandEmpty>No sex found.</CommandEmpty>
                                <CommandGroup>
                                {sexs.map((sex) => (
                                    <CommandItem
                                    key={sex.value}
                                    value={sex.value}
                                    onSelect={(currentValue) => {
                                        setsexValue(currentValue === sexvalue ? "" : currentValue)
                                        setsexOpen(false)
                                    }}
                                    >
                                    <Check
                                        className={cn(
                                        "mr-2 h-4 w-4",
                                        sexvalue === sex.value ? "opacity-100" : "opacity-0"
                                        )}
                                    />
                                    {sex.label}
                                    </CommandItem>
                                ))}
                                </CommandGroup>
                            </CommandList>
                            </Command>
                        </PopoverContent>
                    </Popover>

                    {/**Select BMI */}
                    <Popover open={BMIopen} onOpenChange={setBMIOpen}>
                        <PopoverTrigger asChild>
                            <Button
                            variant="outline"
                            role="combobox"
                            aria-expanded={BMIopen}
                            className="w-[200px] justify-between"
                            >
                            {BMIvalue
                                ? BMIs.find((bmi) => bmi.value === BMIvalue)?.label
                                : "Select BMI"}
                            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-[200px] p-0">
                            <Command>
                            <CommandList>
                                <CommandEmpty>No sex found.</CommandEmpty>
                                <CommandGroup>
                                {BMIs.map((bmi) => (
                                    <CommandItem
                                    key={bmi.value}
                                    value={bmi.value}
                                    onSelect={(currentValue) => {
                                        setBMIValue(currentValue === BMIvalue ? "" : currentValue)
                                        setBMIOpen(false)
                                    }}
                                    >
                                    <Check
                                        className={cn(
                                        "mr-2 h-4 w-4",
                                        BMIvalue === bmi.value ? "opacity-100" : "opacity-0"
                                        )}
                                    />
                                    {bmi.label}
                                    </CommandItem>
                                ))}
                                </CommandGroup>
                            </CommandList>
                            </Command>
                        </PopoverContent>
                    </Popover>
                    
                    {/**Select Ethnicitys */}
                    <Popover open={Ethnicityopen} onOpenChange={setEthnicityOpen}>
                        <PopoverTrigger asChild>
                            <Button
                            variant="outline"
                            role="combobox"
                            aria-expanded={Ethnicityopen}
                            className="w-[220px] justify-between"
                            >
                            {Ethnicityvalue
                                ? Ethnicitys.find((Ethnicity) => Ethnicity.value === Ethnicityvalue)?.label
                                : "Select Ethnicity"}
                            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-[220px] p-0">
                            <Command>
                            <CommandList>
                                <CommandEmpty>No sex found.</CommandEmpty>
                                <CommandGroup>
                                {Ethnicitys.map((Ethnicity) => (
                                    <CommandItem
                                    key={Ethnicity.value}
                                    value={Ethnicity.value}
                                    onSelect={(currentValue) => {
                                        setEthnicityValue(currentValue === Ethnicityvalue ? "" : currentValue)
                                        setEthnicityOpen(false)
                                    }}
                                    >
                                    <Check
                                        className={cn(
                                        "mr-2 h-4 w-4",
                                        Ethnicityvalue === Ethnicity.value ? "opacity-100" : "opacity-0"
                                        )}
                                    />
                                    {Ethnicity.label}
                                    </CommandItem>
                                ))}
                                </CommandGroup>
                            </CommandList>
                            </Command>
                        </PopoverContent>
                    </Popover>

                    {/**Calendar */}

                    
                       {/** Calendar Component */}
                            <div className="grid gap-2">
                            <Popover>
                                <PopoverTrigger asChild>
                                <Button
                                    id="date"
                                    variant={"outline"}
                                    className={cn(
                                    "w-[300px] justify-start text-left font-normal",
                                    !date && "text-muted-foreground"
                                    )}
                                >
                                    <CalendarIcon className="mr-2 h-4 w-4" />
                                    {date?.from ? (
                                    date.to ? (
                                        <>
                                        {format(date.from, "MMM yyyy")} - {format(date.to, "MMM yyyy")}
                                        </>
                                    ) : (
                                        format(date.from, "MMM yyyy")
                                    )
                                    ) : (
                                    <span>Pick a date</span>
                                    )}
                                </Button>
                                </PopoverTrigger>
                                <PopoverContent className="w-auto p-0" align="start">
                                <Calendar
                                    initialFocus
                                    mode="range"
                                    defaultMonth={date?.from}
                                    selected={date}
                                    onSelect={setDate}
                                    numberOfMonths={2}
                                />
                                </PopoverContent>
                            </Popover>
                            </div>



                </CardContent>
            </Card>

            {/* Bottom Section */}
            <Card>
                <CardHeader>
                    <CardTitle >Trends</CardTitle>
                    <CardDescription className="flex space-x-2">
                {sexvalue && (
                    <Badge variant="outline" className="flex items-center w-[auto]">
                    Sex:{sexs.find((sex) => sex.value === sexvalue)?.label}
                    <button
                    className="ml-2 h-4 w-4 text-gray-500 hover:text-gray-700 focus:outline-none"
                    onClick={() => setsexValue("")}
                    >
                    X
                    </button>
                    </Badge>
                )}
                {BMIvalue && (
                    <Badge variant="outline" className="flex items-center w-[auto]">
                    BMI:{BMIs.find((bmi) => bmi.value === BMIvalue)?.label}
                    <button
                    className="ml-2 h-4 w-4 text-gray-500 hover:text-gray-700 focus:outline-none"
                    onClick={() => setBMIValue("")}
                    >
                    X
                    </button>
                    </Badge>
                )}
                {Ethnicityvalue && (
                    <Badge variant="outline" className="flex items-center w-[auto]">
                    Ethnicity:{Ethnicitys.find((Ethnicity) => Ethnicity.value === Ethnicityvalue)?.label}
                    <button
                    className="ml-2 h-4 w-4 text-gray-500 hover:text-gray-700 focus:outline-none"
                    onClick={() => setEthnicityValue("")}
                    >
                    X
                    </button>
                    </Badge>
                )}
                </CardDescription>
                </CardHeader>
                <CardContent className="flex space-x-10">
                    {/* Left Side: Top 5 Diagnosis Methods */}
                    <Card className="w-[400px] h-[auto]">
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
                                    </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                    {diagnosis.map((diagnosi) => (
                                        <TableRow key={diagnosi.diagnosis} className="hover:bg-gray-50">
                                        <TableCell className="flex items-center space-x-2 pl-4 py-4"> 
                                            <Badge  
                                            style={{       
                                                backgroundColor: getBadgeColor(diagnosi.diagnosis), 
                                            }}
                                            />
                                            <span className="font-medium">{diagnosi.diagnosis}</span>
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
                    <Card className="w-[850px] h-[auto]">
                        <CardHeader>
                            <CardTitle>Chart</CardTitle>
                            <CardDescription>This is chart</CardDescription>
                        </CardHeader>
                        <CardContent >
                                <RadioGroup  
                                className="flex space-x-2"
                                aria-label="metric"
                                name="metric"
                                value={selectedMetric}
                                onValueChange={handleMetricChange}
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
                            <ChartContainer config={chartConfig} className="h-[400px] w-full">
                                {/** Chart Component */}
                                <ComposedChart
                                    width={500}
                                    height={400}
                                    data={filteredData}
                                    margin={{
                                        top: 10,
                                        right: 30,
                                        left: 0,
                                        bottom: 0,
                                    }}
                                    >
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="time" />
                                <YAxis label={{ value: selectedMetric, angle: -90, position: 'insideLeft', textAnchor: 'middle' }} domain={['auto', 'auto']}/>
                                <Tooltip  />
                                <Legend  />
                                    {selectedMetric === "WBC" && (
                                        <>
                                        <Area  dataKey={`UL95CI_Male${selectedMetric}`} stroke="#8884d8" fill="#FFC125"/>
                                        <Line  dataKey={`Male${selectedMetric}`} stroke="#CD5555" />
                                        <Area  dataKey={`UL95CI_Female${selectedMetric}`} stroke="#8884d8" fill="#8884d8"/>
                                        <Line  dataKey={`Female${selectedMetric}`} stroke="#1874CD" />
                                      </>
                                    )}
                                     {selectedMetric === "HGB" && (
                                        <>
                                        <Area  dataKey={`UL95CI_Male${selectedMetric}`} stroke="#8884d8" fill="#FFC125"/>
                                        <Line  dataKey={`Male${selectedMetric}`} stroke="#CD5555" />
                                        <Area  dataKey={`UL95CI_Female${selectedMetric}`} stroke="#8884d8" fill="#8884d8"/>
                                        <Line  dataKey={`Female${selectedMetric}`} stroke="#1874CD" />
                                        </>
                                    )}
                                    {selectedMetric === "RBC" && (
                                        <>
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



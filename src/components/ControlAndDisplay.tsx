
import React, { useState,useMemo } from 'react';
import { Box, Grid, TextField,  Chip, FormControl, InputLabel, Select, MenuItem,  Typography } from '@mui/material';
import TuneIcon from '@mui/icons-material/Tune';
import NewspaperIcon from '@mui/icons-material/Newspaper';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Card,CardContent, CardDescription,CardFooter,CardHeader,CardTitle,} from "@/components/ui/card"
import { ChartConfig, ChartContainer,ChartTooltip, ChartTooltipContent,ChartLegend, ChartLegendContent} from "@/components/ui/chart"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Check, ChevronsUpDown } from "lucide-react"
import { cn } from "@/lib/utils"
import { Input } from "@/components/ui/input"
import { addDays, format } from "date-fns"
import { Calendar as CalendarIcon } from "lucide-react"
import { DateRange } from "react-day-picker"
import { Calendar } from "@/components/ui/calendar"
import { Badge } from "@/components/ui/badge"
import { TrendingUp } from "lucide-react"
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
  
const initialDummyData = [
    { time: 'Jan', WBC: 6000, HGB: 14,   RBC: 4.5, diagnosis: 'Diagnosis Method 1', sex: 'Male' },
    { time: 'Feb', WBC: 6200, HGB: 13.9, RBC: 4.6, diagnosis: 'Diagnosis Method 2', sex: 'Female' },
    { time: 'Mar', WBC: 6100, HGB: 14.1, RBC: 4.7, diagnosis: 'Diagnosis Method 3', sex: 'Male' },
    { time: 'Apr', WBC: 6300, HGB: 14.2, RBC: 4.8, diagnosis: 'Diagnosis Method 1', sex: 'Female' },
    { time: 'May', WBC: 6400, HGB: 14.3, RBC: 4.9, diagnosis: 'Diagnosis Method 4', sex: 'Male' },
    { time: 'Jun', WBC: 6500, HGB: 14.5, RBC: 5.0, diagnosis: 'Diagnosis Method 2', sex: 'Female' },
];

const ControlAndDisplay: React.FC = () => {


    


    const [date, setDate] = React.useState<DateRange | undefined>({

        from: new Date(),
        to: addDays(new Date(), 20),
      })

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
    const [filteredData, setFilteredData] = useState(initialDummyData);

    // const handleFilterApply = () => {
    //     const newFilter = `Sex: ${sex}`;
    //     if (!selectedFilters.includes(newFilter) && sex) {
    //         setSelectedFilters((prev) => [...prev, newFilter]);
    //     }

    //     // Apply filtering based on the selected sex
    //     const newFilteredData = initialDummyData.filter((item) => !sex || item.sex === sex);
    //     setFilteredData(newFilteredData);
    // };

    const handleChipDelete = (chipToDelete: string) => {
        setSelectedFilters((chips) => chips.filter((chip) => chip !== chipToDelete));
        // Reset to initial data when a filter is removed
        setFilteredData(initialDummyData);
    };

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
                <CardContent className="flex space-x-2">
                {sexvalue && (
                    <Badge variant="outline" className="flex items-center w-[80px]">
                    {sexs.find((sex) => sex.value === sexvalue)?.label}
                    <button
                    className="ml-2 h-4 w-4 text-gray-500 hover:text-gray-700 focus:outline-none"
                    onClick={() => setsexValue("")}
                    >
                    X
                    </button>
                    </Badge>
                )}
                {BMIvalue && (
                    <Badge variant="outline" className="flex items-center w-[150px]">
                    {BMIs.find((bmi) => bmi.value === BMIvalue)?.label}
                    <button
                    className="ml-2 h-4 w-4 text-gray-500 hover:text-gray-700 focus:outline-none"
                    onClick={() => setBMIValue("")}
                    >
                    X
                    </button>
                    </Badge>
                )}
                {Ethnicityvalue && (
                    <Badge variant="outline" className="flex items-center w-[200px]">
                    {Ethnicitys.find((Ethnicity) => Ethnicity.value === Ethnicityvalue)?.label}
                    <button
                    className="ml-2 h-4 w-4 text-gray-500 hover:text-gray-700 focus:outline-none"
                    onClick={() => setEthnicityValue("")}
                    >
                    X
                    </button>
                    </Badge>
                )}
                </CardContent>



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

                    <div className={cn("grid gap-2")}>
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

                                        {format(date.from, "LLL , y")} -{" "}
                                        {format(date.to, "LLL , y")}
                                        </>
                                    ) : (
                                        format(date.from, "LLL , y")

                                        
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
                    <CardDescription>Card Description</CardDescription>
                </CardHeader>
                <CardContent className="flex space-x-10">
                    {/* Left Side: Top 5 Diagnosis Methods */}
                    <Card className="w-[400px] h-[400px]">
                        <CardHeader>
                            <CardTitle>Top 5 Diagnosis Methods</CardTitle>
                            <CardDescription>Card Description</CardDescription>
                        </CardHeader>
                        <CardContent>
                        <div className="space-y-1">
                        {filteredData.slice(0, 5).map((item, index) => (
                                <p key={index}>
                                 {item.diagnosis} 
                                </p>
                            ))}
                        </div>
                        </CardContent>
                    </Card>
                    {/*  Chart */}
                    <Card className="w-[850px] h-[400px]">
                        <CardHeader>
                            <CardTitle>Chart</CardTitle>
                            <CardDescription>Date from 2024-08-01 to 2024-09-01</CardDescription>
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
                            <ChartContainer config={chartConfig} className="h-[200px] w-full">
                                <LineChart data={filteredData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="time" />
                                    <YAxis />
                                    <Tooltip />
                                    <Line type="monotone" dataKey={selectedMetric} stroke="#8884d8" />
                                </LineChart>
                            </ChartContainer>
                        </CardContent>
                    </Card>
                </CardContent>
            </Card>

            
        </Box>
    );
};

export default ControlAndDisplay;



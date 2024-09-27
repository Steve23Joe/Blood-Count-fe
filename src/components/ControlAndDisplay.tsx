
import React, { useState,useMemo,useEffect  } from 'react';
import { Box, Grid, TextField,  Chip, FormControl, InputLabel, Select, MenuItem,  Typography } from '@mui/material';
import TuneIcon from '@mui/icons-material/Tune';
import NewspaperIcon from '@mui/icons-material/Newspaper';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip,  Legend,Area,AreaChart,ComposedChart, DefaultLegendContent,
    ResponsiveContainer,BarChart, Bar, Rectangle, } from 'recharts';
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
import './style.css'; 
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
        "diagnosis":"MildAnemia",
        "count":"450"
    },
    {
        "diagnosis":"ModerateAnemia",
        "count":"200"
    },
    {
        "diagnosis":"SevereAnemia",
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
      case 'MildAnemia':
        return '#EEEE00'; 
      case 'ModerateAnemia':
        return '#EE7942'; 
      case 'SevereAnemia':
        return '#FF0000'; 
      case 'Polycythemia':
        return '#8A2BE2'; 
      default:
        return '#ccc';
    }
  };

  
  

const ControlAndDisplay: React.FC = () => {

       
   
    const [initialDummyData, setInitialDummyData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await fetch('src/components/data.json');
            if (!response.ok) {
              throw new Error('Network response was not ok ' + response.statusText);
            }
            const data = await response.json();
            setInitialDummyData(data);
          } catch (error) {
            console.error("Error fetching data:", error);
          }
        };
      
        fetchData();
      }, []);

    const [state, setState] = React.useState({
        ageopen:false,
        agevalue:"Minor(<18)",
        sexopen: false,
        sexvalue: "all",
        BMIopen: false,
        BMIvalue: "Normal(18-24.9)",
        Ethnicityopen: false,
        Ethnicityvalue: "White British"
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
        if (!state.agevalue||!state.sexvalue||!state.Ethnicityvalue||!state.BMIvalue) {
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

            // BMI筛选
        if (state.BMIvalue) {
        const selectedBMI = state.BMIvalue;
        filtered = filtered.filter((data) => {
                const BMI = data.BMI;
                if (selectedBMI === "Underweight(<18)" && BMI < 18) {
                    return true;
                } else if (selectedBMI === "Normal(18-24.9)" && BMI >= 18 && BMI < 25) {
                    return true;  
                } 
                else if (selectedBMI === "Overweight(25-29.9)" && BMI >= 25 && BMI < 30) {
                    return true;
                    
                }else if (selectedBMI === "Obesity(>30)" && BMI >= 30) {
                    return true;
                }
                return false;
            });
           } 
    
        // 性别筛选
        if (state.sexvalue) {
            const selectedSex = state.sexvalue;
            filtered = filtered.filter((data) => data.sex === selectedSex);
        }

        // 人种筛选
        if (state.Ethnicityvalue) {
            const selectedEthnicity = state.Ethnicityvalue;
            filtered = filtered.filter((data) => data.Ethnicity === selectedEthnicity);
        }
        
        
        return filtered;
    }, [fromDate, toDate, initialDummyData, state.agevalue, state.sexvalue,state.BMIvalue,state.Ethnicityvalue]);
    
            // 计算 RBC 数据的总和并更新 diagnosis
        const updatedDiagnosis = diagnosis.map((diag) => {
            const rbcCount = filteredData.reduce((acc, data) => {
                // 根据诊断类型匹配对应的 RBC 数据
                if (diag.diagnosis === "Normal") return acc + data.NormalRBC;
                if (diag.diagnosis === "MildAnemia") return acc + data.MildAnemiaRBC;
                if (diag.diagnosis === "ModerateAnemia") return acc + data.ModerateAnemiaRBC;
                if (diag.diagnosis === "SevereAnemia") return acc + data.SevereAnemiaRBC;
                if (diag.diagnosis === "Polycythemia") return acc + data.PolycythemiaRBC;
                return acc;
            }, 0);

            return {
                ...diag,
                count: rbcCount // 将计算出的 RBC 总和赋值到 count
            };
        });

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

    const renderBadge = (label, value, clearValue) => (
        <Badge variant="outline" className="flex items-center w-[auto]">
          {label}: {value}
          <button
            className="ml-4 h-6 w-4 text-gray-500 hover:text-gray-700 focus:outline-none"
            onClick={clearValue}
          >
            X
          </button>
        </Badge>
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
                <>
                            {state.agevalue &&
                            renderBadge(
                                "Age",
                                Ages.find((age) => age.value === state.agevalue)?.label,
                                () => setState((prev) => ({ ...prev, agevalue: "" }))
                            )}

                            {state.sexvalue && 
                            renderBadge(
                                "Sex",
                                sexs.find((sex) => sex.value === state.sexvalue)?.label,
                                () => setState((prev) => ({ ...prev, sexvalue: "" }))
                            )}

                            {state.BMIvalue &&
                            renderBadge(
                                "BMI",
                                BMIs.find((bmi) => bmi.value === state.BMIvalue)?.label,
                                () => setState((prev) => ({ ...prev, BMIvalue: "" }))
                            )}

                            {state.Ethnicityvalue &&
                            renderBadge(
                                "Ethnicity",
                                Ethnicitys.find((Ethnicity) => Ethnicity.value === state.Ethnicityvalue)?.label,
                                () => setState((prev) => ({ ...prev, Ethnicityvalue: "" }))
                            )}

                            {fromDate &&
                            renderBadge(
                                "From Date",
                                moment(fromDate).format(monthFormat),
                                () => setFromDate(null)
                            )}

                            {toDate &&
                            renderBadge(
                                "To Date",
                                moment(toDate).format(monthFormat),
                                () => setToDate(null)
                            )}
                        </>
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
                                        {updatedDiagnosis.map((diagnosi) => (
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
                                                        <AlertDialogContent>
                                                            <AlertDialogHeader>
                                                                <AlertDialogTitle>This is {diagnosi.diagnosis}'s diagnosis.</AlertDialogTitle>
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
                                                    {Math.floor(diagnosi.count)} {/* 将 count 转为整数 */}
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
                                        <Area  dataKey={`UL95CI_Female${selectedMetric}`} stroke="#8884d8" fill="#FF6A6A"/>
                                        <Line  dataKey={`Female${selectedMetric}`} stroke="#1874CD" />
                                      </>
                                    )}
                                     {selectedMetric === "HGB" && (
                                        <>
                                        {/* 如果 selectedMetric 为 "HGB"，图表内容与 WBC 类似，但显示的是血红蛋白数据。 */}
                                        <Bar  dataKey={`UL95CI_Male${selectedMetric}`} stroke="#8884d8" fill="#FFC125"/>
                                        <Line  dataKey={`Male${selectedMetric}`} stroke="#CD5555" />
                                        <Bar  dataKey={`UL95CI_Female${selectedMetric}`} stroke="#8884d8" fill="#FF6A6A"/>
                                        <Line  dataKey={`Female${selectedMetric}`} stroke="#1874CD" />
                                        </>
                                    )}
                                    {selectedMetric === "RBC" && (
                                        <>
                                        {/* 如果 selectedMetric 为 "RBC"，图表显示多条线条，分别表示正常和不同程度贫血等情况。 */}
                                        <Bar  dataKey={`Normal${selectedMetric}`} fill="#228B22" />
                                        <Bar  dataKey={`MildAnemia${selectedMetric}`} fill="#EEEE00" />
                                        <Bar  dataKey={`ModerateAnemia${selectedMetric}`} fill="#EE7942" />
                                        <Bar  dataKey={`SevereAnemia${selectedMetric}`} fill="#FF0000" />
                                        <Bar  dataKey={`Polycythemia${selectedMetric}`} fill="#8A2BE2" />
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
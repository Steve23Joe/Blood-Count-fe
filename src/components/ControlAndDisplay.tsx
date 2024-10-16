
import React, { useState,useMemo,useEffect,useRef  } from 'react';
import 'timezone-js'; 
import moment from 'moment-timezone';
import { DateTime } from 'luxon';
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
import ReactDOM from 'react-dom';
import { Formik, Field, Form } from 'formik';
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
import ReactEcharts from 'echarts-for-react';
import * as d3 from 'd3-geo';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
// Initialize the map module
import topology from './world.json'; // Import your local GeoJSON data
import HighchartsMap from 'highcharts/modules/map'; // 导入地图模块
HighchartsMap(Highcharts);

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
        return '#3A5FCD'; 
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

    const data = [
                ['fo', 10], ['um', 11], ['us', 12], ['jp', 13], ['sc', 14], ['fr', 15],
                ['fm', 16], ['cn', 17], ['pt', 18], ['sw', 19], ['sh', 20], ['br', 21],
                ['ki', 22], ['ph', 23], ['mx', 24], ['bu', 25], ['mv', 26], ['sp', 27],
                ['gb', 28], ['gr', 29], ['as', 30], ['dk', 31], ['gl', 32], ['gu', 33],
                ['mp', 34], ['pr', 35], ['vi', 36], ['ca', 37], ['st', 38], ['cv', 39],
                ['dm', 40], ['nl', 41], ['jm', 42], ['ws', 43], ['om', 44], ['vc', 45],
                ['tr', 46], ['bd', 47], ['lc', 48], ['nr', 49], ['no', 50], ['kn', 51],
                ['bh', 52], ['to', 53], ['fi', 54], ['id', 55], ['mu', 56], ['se', 57],
                ['tt', 58], ['my', 59], ['pa', 60], ['pw', 61], ['tv', 62], ['mh', 63],
                ['th', 64], ['gd', 65], ['ee', 66], ['ag', 67], ['tw', 68], ['bb', 69],
                ['it', 70], ['mt', 71], ['vu', 72], ['sg', 73], ['cy', 74], ['lk', 75],
                ['km', 76], ['fj', 77], ['ru', 78], ['va', 79], ['sm', 80], ['kz', 81],
                ['az', 82], ['am', 83], ['tj', 84], ['ls', 85], ['uz', 86], ['in', 87],
                ['es', 88], ['ma', 89], ['ec', 90], ['co', 91], ['tl', 92], ['tz', 93],
                ['ar', 94], ['sa', 95], ['pk', 96], ['ye', 97], ['ae', 98], ['ke', 99],
                ['pe', 100], ['do', 101], ['ht', 102], ['ao', 103], ['kh', 104],
                ['vn', 105], ['mz', 106], ['cr', 107], ['bj', 108], ['ng', 109],
                ['ir', 110], ['sv', 111], ['cl', 112], ['sl', 113], ['gw', 114],
                ['hr', 115], ['bz', 116], ['za', 117], ['cf', 118], ['sd', 119],
                ['ly', 120], ['cd', 121], ['kw', 122], ['pg', 123], ['de', 124],
                ['ch', 125], ['er', 126], ['ie', 127], ['kp', 128], ['kr', 129],
                ['gy', 130], ['hn', 131], ['mm', 132], ['ga', 133], ['gq', 134],
                ['ni', 135], ['lv', 136], ['ug', 137], ['mw', 138], ['sx', 139],
                ['tm', 140], ['zm', 141], ['nc', 142], ['mr', 143], ['dz', 144],
                ['lt', 145], ['et', 146], ['gh', 147], ['si', 148], ['gt', 149],
                ['ba', 150], ['jo', 151], ['sy', 152], ['mc', 153], ['al', 154],
                ['uy', 155], ['cnm', 156], ['mn', 157], ['rw', 158], ['so', 159],
                ['bo', 160], ['cm', 161], ['cg', 162], ['eh', 163], ['rs', 164],
                ['me', 165], ['tg', 166], ['la', 167], ['af', 168], ['ua', 169],
                ['sk', 170], ['jk', 171], ['bg', 172], ['ro', 173], ['qa', 174],
                ['li', 175], ['at', 176], ['sz', 177], ['hu', 178], ['ne', 179],
                ['lu', 180], ['ad', 181], ['ci', 182], ['lr', 183], ['bn', 184],
                ['be', 185], ['iq', 186], ['ge', 187], ['gm', 188], ['td', 189],
                ['kv', 190], ['lb', 191], ['dj', 192], ['bi', 193], ['sr', 194],
                ['il', 195], ['ml', 196], ['sn', 197], ['gn', 198], ['zw', 199],
                ['pl', 200], ['mk', 201], ['py', 202], ['by', 203], ['cz', 204],
                ['bf', 205], ['na', 206], ['tn', 207], ['bt', 208], ['kg', 209],
                ['md', 210], ['ss', 211], ['bw', 212], ['sb', 213], ['ve', 214],
                ['nz', 215], ['cu', 216], ['au', 217], ['bs', 218], ['mg', 219],
                ['is', 220], ['eg', 221], ['np', 222]
            ];
           
    

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
    const [selectedMetric, setSelectedMetric] = useState('RBC');
    const [highlightedRBC, setHighlightedRBC] = useState(null); // 新增状态用于高亮显示的 RBC 状态
    const [selectedDiagnosis, setSelectedDiagnosis] = useState(null);
    //const [sex] = useState('');
    // const [filteredData, setFilteredData] = useState(initialDummyData);
    const chartConfig = {}; // Chart 配置

    const handleRowClick = (diagnosis) => {
        setSelectedDiagnosis(diagnosis); // 更新选中的诊断方法
        setHighlightedRBC(diagnosis); // 更新需要高亮显示的 RBC 状态
    };
   
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
    
    const inputRef = useRef(null);
    const chartRef = useRef(null);

    // Country timezone mapping
        const timezoneMapping = {
            'JP': 'Asia/Tokyo',               // Japan
            'US': 'America/New_York',         // United States (Eastern)
            'FR': 'Europe/Paris',             // France
            'DE': 'Europe/Berlin',            // Germany
            'CN': 'Asia/Shanghai',            // China
            'IN': 'Asia/Kolkata',             // India
            'BR': 'America/Sao_Paulo',       // Brazil
            'AU': 'Australia/Sydney',         // Australia
            'CA': 'America/Toronto',          // Canada
            'MX': 'America/Mexico_City',     // Mexico
            'RU': 'Europe/Moscow',            // Russia
            'ZA': 'Africa/Johannesburg',      // South Africa
            'IT': 'Europe/Rome',              // Italy
            'ES': 'Europe/Madrid',            // Spain
            'NL': 'Europe/Amsterdam',         // Netherlands
            'SE': 'Europe/Stockholm',         // Sweden
            'NO': 'Europe/Oslo',              // Norway
            'FI': 'Europe/Helsinki',          // Finland
            'PL': 'Europe/Warsaw',            // Poland
            'DK': 'Europe/Copenhagen',        // Denmark
            'IE': 'Europe/Dublin',            // Ireland
            'PT': 'Europe/Lisbon',            // Portugal
            'TR': 'Europe/Istanbul',          // Turkey
            'JP': 'Asia/Tokyo',               // Japan
            'KR': 'Asia/Seoul',               // South Korea
            'SG': 'Asia/Singapore',            // Singapore
            'MY': 'Asia/Kuala_Lumpur',        // Malaysia
            'TH': 'Asia/Bangkok',             // Thailand
            'VN': 'Asia/Ho_Chi_Minh',         // Vietnam
            'PH': 'Asia/Manila',              // Philippines
            'AR': 'America/Argentina/Buenos_Aires', // Argentina
            'CL': 'America/Santiago',         // Chile
            'CO': 'America/Bogota',           // Colombia
            'PE': 'America/Lima',             // Peru
            'VE': 'America/Caracas',          // Venezuela
            'AE': 'Asia/Dubai',               // United Arab Emirates
            'IL': 'Asia/Jerusalem',           // Israel
            'EG': 'Africa/Cairo',             // Egypt
            'NG': 'Africa/Lagos',             // Nigeria
            'KE': 'Africa/Nairobi',           // Kenya
            'GH': 'Africa/Accra',             // Ghana
            'UG': 'Africa/Kampala',           // Uganda
            'TZ': 'Africa/Dar_es_Salaam',    // Tanzania
            'DZ': 'Africa/Algiers',           // Algeria
            'MA': 'Africa/Casablanca',        // Morocco
        };

        const handleCountryClick = (countryCode) => {
            const chart = chartRef.current.chart;
            if (!chart) return;
    
            // 使用 chart.series[0].data 找到对应的点
            const matchingPoint = chart.series[0].data.find(point => point.properties['hc-a2'] === countryCode);
    
            // 重置所有点的状态
            chart.series[0].data.forEach(point => {
                point.setState('');
            });
    
            if (matchingPoint) {
                // 确定匹配国家是白天还是夜晚
                const isDay = isDayTime(countryCode);
                const highlightColor = isDay ? '#FFD700' : '#2E3A87'; // 白天高亮颜色和夜晚高亮颜色
    
                // 设置匹配的点为悬停状态，并使用相应的颜色
                matchingPoint.setState('hover');
                matchingPoint.graphic.attr({ fill: highlightColor }); // 直接设置填充颜色
    
                // 1秒后恢复原来的颜色
                setTimeout(() => {
                    const originalColor = '#0076B8'; // 假设原始颜色为此
                    matchingPoint.graphic.attr({ fill: originalColor });
                }, 1000);
            } else {
                console.log('No matching country found for input:', countryCode);
            }
        };
    
        const data1 = [
            { name: 'China', code: 'CN' },
            { name: 'Japan', code: 'JP' },
            { name: 'Canada', code: 'CA' },
        ];
        
            // Function to get local time based on country code
            const getLocalTime = (countryCode) => {
                const timezone = timezoneMapping[countryCode];
                if (timezone) {
                    const localTime = DateTime.now().setZone(timezone);
                    return localTime.hour; // Returns hours in 24-hour format
                }
                return null; // Return null if timezone is not found
            };
            
            // Function to determine if it's daytime or nighttime based on country code
            const isDayTime = (countryCode) => {
                const hours = getLocalTime(countryCode); // Get the current hour in the country's timezone
                console.log(`Country Code: ${countryCode}, Local Hours: ${hours}`); // Debug log
                return hours !== null && hours >= 6 && hours < 18; // Daytime is defined from 6 AM to 6 PM
            };
            
            // Handle submit event and update the map based on local time
            const handleSubmit = () => {
                const value = inputRef.current.value.trim().toLowerCase(); // Get input value and process it
                console.log('Submitted Value:', value);
            
                const chart = chartRef.current.chart;
                if (!chart) return;
            
                // Find the matching data point
                const matchingPoint = chart.series[0].data.find(point => {
                    return point.name && point.name.toLowerCase().includes(value);
                });
            
                // Reset all points' states
                chart.series[0].data.forEach(point => {
                    point.setState('');
                });
            
                if (matchingPoint) {
                    console.log('Matched Country:', matchingPoint.name);
                    
                    // Get the country's code from properties
                    const countryCode = matchingPoint.properties['hc-a2']; // Use 'hc-a2' for country code
            
                    // Determine if it's day or night for the matched country
                    const isDay = isDayTime(countryCode); // Check if it is day or night
            
                    console.log(`Is Day: ${isDay}`); // Debug log
                    const highlightColor = isDay ? '#FFD700' : '#2E3A87'; // Light green for day, dark green for night
            
                    // Set the matched point to hover state with the appropriate color
                    matchingPoint.setState('hover');
                    matchingPoint.graphic.attr({ fill: highlightColor }); // Set fill color directly
                    
                } else {
                    console.log('No matching country found for input:', value);
                }
            };

            const mapOptions = {
                chart: {
                    map: topology,
                    backgroundColor: '#f5f5f5',
                },
                title: {
                    text: 'Highcharts Maps Basic Demo',
                },
                subtitle: {
                    text: 'Source map: Local GeoJSON data',
                },
                mapNavigation: {
                    enabled: true,
                    buttonOptions: {
                        verticalAlign: 'bottom',
                    },
                },
                colorAxis: {
                    min: 0,
                    stops: [
                        [0, '#0076B8'],
                        
                    ],

                },
                tooltip: {
                    useHTML: true,
                    formatter: function () {
                        const countryName = this.point.name;
                        const value = this.point.value;
                        const countryCode = this.point.properties['hc-a2'];
                        const isDay = isDayTime(countryCode);
                        const timeStatus = isDay ? 'Day' : 'Night';
                        return `<b>${countryName}</b>: ${value}<br>Status: ${timeStatus}`;
                    },
                },
                series: [
                    {
                        data: data,
                        states: {
                            hover: {
                                enabled: false, // 禁用悬停效果
                            },
                        },
                        point: {
                            events: {
                                // 点击事件
                                click: function () {
                                    const point = this; // 当前点击的点
                                    const countryCode = point.properties['hc-a2'];
                                    const isDay = isDayTime(countryCode);
                                    let highlightColor;
                                    
                                    // 根据白天或夜晚状态设置颜色
                                    if (isDay) {
                                        highlightColor = '#FFD700'; // 白天高亮颜色
                                    } else {
                                        highlightColor = '#2E3A87'; // 夜晚高亮颜色
                                    }
                                    
                                    // 设置填充颜色
                                    if (point.graphic) {
                                        point.graphic.attr({ fill: highlightColor });
                                    }
                                    
                                    
                                    // 1秒后恢复原来的颜色
                                    setTimeout(() => {
                                        const originalColor = '#0076B8'; // 假设原始颜色为此，或根据需要调整
                                        point.graphic.attr({ fill: originalColor });
                                    }, 1000);
                                },
                            },
                        },
                    },
                ],
            };
            
            
            
            
            
            


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
           
            <Card>
            <CardHeader>
                <CardTitle>Trends</CardTitle>
                <CardDescription></CardDescription>
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
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {updatedDiagnosis
                                    .sort((a, b) => b.count - a.count) // 按 count 降序排序
                                    .map((diagnosi) => (
                                        <TableRow 
                                            key={diagnosi.diagnosis} 
                                            className={`hover:bg-gray-50 ${selectedDiagnosis === diagnosi.diagnosis ? 'bg-blue-100' : ''}`} 
                                            onClick={() => handleRowClick(diagnosi.diagnosis)} // 点击行时更新选中的诊断
                                        >
                                            <TableCell className="flex items-center space-x-2 pl-4 py-4"> 
                                                <Badge  
                                                    style={{ backgroundColor: getBadgeColor(diagnosi.diagnosis) }}
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

                {/* Chart */}
                <Card className="border border-gray-300 rounded-lg shadow-md w-3/4 h-[auto]">
                    <CardHeader className="bg-white p-4 rounded-t-lg shadow-sm">
                        <CardTitle className="text-xl font-semibold text-gray-700">Chart</CardTitle>
                        <CardDescription className="text-sm text-gray-500">This is chart</CardDescription>
                    </CardHeader>
                    <CardContent className="p-4 bg-white rounded-b-lg">
                        <div>
                            <Formik
                                initialValues={{ metric: selectedMetric }}
                                onSubmit={async (values) => {
                                    await new Promise((r) => setTimeout(r, 500));
                                    alert(JSON.stringify(values, null, 2));
                                    setSelectedMetric(values.metric); // 更新选中的度量
                                }}
                            >
                                {({ values }) => (
                                    <Form>
                                        <div role="group" aria-labelledby="my-radio-group" className="flex space-x-2">
                                            <div className="flex items-center space-x-2">
                                                <Field type="radio" name="metric" value="WBC" id="option-one" />
                                                <label htmlFor="option-one">WBC</label>
                                            </div>
                                            <div className="flex items-center space-x-2">
                                                <Field type="radio" name="metric" value="HGB" id="option-two" />
                                                <label htmlFor="option-two">HGB</label>
                                            </div>
                                            <div className="flex items-center space-x-2">
                                                <Field type="radio" name="metric" value="RBC" id="option-three" />
                                                <label htmlFor="option-three">RBC</label>
                                            </div>
                                            <button type="submit" className="px-2 py-1 border-2 border-black bg-white text-black text-base rounded transition-colors duration-300 hover:bg-black hover:text-white active:bg-gray-500 active:border-gray-600">Submit</button>
                                        </div>
                                    </Form>
                                )}
                            </Formik>

                            {/* Display the selected metric after form submission */}
                            <div className="mt-4">
                                <strong>Currently Selected Metric:</strong> {selectedMetric}
                            </div>
                        </div>
                        <ChartContainer config={chartConfig} className="h-96 w-full bg-gray-100 rounded-lg shadow-md">
                            <ComposedChart data={filteredData} margin={{ top: 10, right: 30, left: 30, bottom: 0 }}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="time" />
                                <YAxis label={{ value: selectedMetric, angle: -90, position: 'insideLeft', textAnchor: 'middle' }} domain={['auto', 'auto']} />
                                <Tooltip />
                                <Legend />
                                {selectedMetric === "WBC" && (
                                    <>
                                        <Area dataKey={`UL95CI_Male${selectedMetric}`} stroke="#8884d8" fill="#FFC125"/>
                                        <Line dataKey={`Male${selectedMetric}`} stroke="#CD5555" />
                                        <Area dataKey={`UL95CI_Female${selectedMetric}`} stroke="#8884d8" fill="#FF6A6A"/>
                                        <Line dataKey={`Female${selectedMetric}`} stroke="#1874CD" />
                                    </>
                                )}
                                {selectedMetric === "HGB" && (
                                    <>
                                        <Bar dataKey={`UL95CI_Male${selectedMetric}`} stroke="#8884d8" fill="#FFC125"/>
                                        <Line dataKey={`Male${selectedMetric}`} stroke="#CD5555" />
                                        <Bar dataKey={`UL95CI_Female${selectedMetric}`} stroke="#8884d8" fill="#FF6A6A"/>
                                        <Line dataKey={`Female${selectedMetric}`} stroke="#1874CD" />
                                    </>
                                )}
                              {selectedMetric === "RBC" && (
                                <>
                                    <Bar 
                                        dataKey={`Normal${selectedMetric}`} 
                                        fill="#228B22"  
                                        style={highlightedRBC ? (highlightedRBC === 'Normal' ? { opacity: 1 } : { opacity: 0.2 }) : { opacity: 1 }} // Dim only when highlighted
                                    />
                                    <Bar 
                                        dataKey={`MildAnemia${selectedMetric}`} 
                                        fill="#3A5FCD"  
                                        style={highlightedRBC ? (highlightedRBC === 'MildAnemia' ? { opacity: 1 } : { opacity: 0.2 }) : { opacity: 1 }} // Dim only when highlighted
                                    />
                                    <Bar 
                                        dataKey={`ModerateAnemia${selectedMetric}`} 
                                        fill="#FF7F24"  
                                        style={highlightedRBC ? (highlightedRBC === 'ModerateAnemia' ? { opacity: 1 } : { opacity: 0.2 }) : { opacity: 1 }} // Dim only when highlighted
                                    />
                                    <Bar 
                                        dataKey={`SevereAnemia${selectedMetric}`} 
                                        fill="#FF0000"  
                                        style={highlightedRBC ? (highlightedRBC === 'SevereAnemia' ? { opacity: 1 } : { opacity: 0.2 }) : { opacity: 1 }} // Dim only when highlighted
                                    />
                                    <Bar 
                                        dataKey={`Polycythemia${selectedMetric}`} 
                                        fill="#8A2BE2"  
                                        style={highlightedRBC ? (highlightedRBC === 'Polycythemia' ? { opacity: 1 } : { opacity: 0.2 }) : { opacity: 1 }} // Dim only when highlighted
                                    />
                                </>
                            )}

                            </ComposedChart>
                        </ChartContainer>
                    </CardContent>
                </Card>
            </CardContent>
        </Card>

            <Card>
            <CardHeader>
                <CardTitle>Card Title</CardTitle>
                <CardDescription>Card Description</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col space-y-4 md:flex-row md:space-y-0 md:space-x-4">
                <Card className="border border-gray-300 rounded-lg shadow-md w-3/4 h-[auto]">
                    <CardHeader>
                        <CardTitle>Card Title</CardTitle>
                        <CardDescription>Card Description</CardDescription>
                    </CardHeader>
                    <CardContent>

                    
                    <div style={{ width: '100%', height: '500px' }}>
                        <HighchartsReact
                            ref={chartRef}
                            highcharts={Highcharts}
                            constructorType={'mapChart'}
                            options={mapOptions}
                        />
                    </div>
                
                    </CardContent>
                </Card>
                <Card className="w-1/4 h-[auto]">
                    <CardHeader>
                        <CardTitle>Top 5 Countries</CardTitle>
                        <CardDescription>Card Description</CardDescription>
                    </CardHeader>
                        <CardContent>
                        <input
                        ref={inputRef}
                        type="text"
                        placeholder="搜索国家名称..."
                        style={{ margin: '5px', padding: '5px', width: '150px' }}
                    />
                    <button onClick={handleSubmit} className="px-2 py-1 border-2 border-black bg-white text-black text-base rounded transition-colors duration-300 hover:bg-black hover:text-white active:bg-gray-500 active:border-gray-600">
                        Submit
                    </button>
                    <Table style={{ margin: '20px 0', borderCollapse: 'collapse', width: '100%' }}>
                    <TableCaption>A list of your recent invoices.</TableCaption>
                    <TableHeader>
                        <TableRow style={{ borderBottom: '1px solid #ccc' }}>
                        <TableHead className="w-[100px]" style={{ padding: '10px' }}>Country</TableHead>
                        <TableHead style={{ padding: '10px' }}>Local Time</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {data1.map(country => (
                        <TableRow 
                            key={country.code} 
                            onClick={() => handleCountryClick(country.code)} 
                            style={{ cursor: 'pointer', borderBottom: '1px solid #eee' }}
                        >
                            <TableCell style={{ padding: '10px' }}>{country.name}</TableCell>
                            <TableCell style={{ padding: '10px' }}>{getLocalTime(country.code)}</TableCell>
                        </TableRow>
                        ))}
                    </TableBody>
                    </Table>
                            

                        </CardContent>
                </Card>
            </CardContent>
            </Card>
        </Box>
    );
};

export default ControlAndDisplay;
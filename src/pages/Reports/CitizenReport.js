import React from "react";
import LargeCard from "../../components/cards/LargeCard";
import TopCards from "../../components/cards/TopCards";
import Header from "../../components/header/Header";
import Sidebar from "../../components/sidebar/Sidebar";
import * as Item from "@mui/material";
import Moment from "react-moment";
import ProjectTable from "../../components/tables/ProjectTable";
import PaginationComponent from "../../components/tables/Pagination";
import { API_BASE,API_BASE_UPLOADS } from "../../utils/Api";
import ReportModal from "../../components/modals/ReportModal";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Box from "@mui/material/Box";
import Badge from "@mui/material/Badge";
import { CSVLink } from "react-csv";
import Fuse from "fuse.js";
import * as Icons from "react-feather";
import ReportQuery from "../../components/modals/ReportQuery";
import MapModal from "../../components/modals/MapModal";

import BlueBG from "../../assets/bg/bluesquare.svg";
import GreenBG from "../../assets/bg/greensquare.svg";
import OrangeBG from "../../assets/bg/orangesquare.svg";
import RedBG from "../../assets/bg/redsquare.svg";
import YellowBG from "../../assets/bg/yellowsquare.svg";

function CitizenReports() {
  const [user, setUser] = React.useState({});
  const [reports, setReports] = React.useState([]);
  const [reportsData, setReportsData] = React.useState([]);
  const [page, setPage] = React.useState(1);
  const [totalPages, setTotalPages] = React.useState(2);
  const [countPerPage, setCountPerPage] = React.useState(10);
  const [filterTerm, setFilterTerm] = React.useState("");
  const [projects, setProjects] = React.useState([]);
  const [project, setProject] = React.useState("");
  const [loading, setLoading] = React.useState(true);
  const [state, setUserstate] = React.useState("");
  const [lga, setLga] = React.useState("");
  const [projectId, setProjectId] = React.useState("");
  const [searchData, setSearchData] = React.useState([]);
  const [commentz, setCommentz] = React.useState([]);
  const [pending, setPending] = React.useState([]);
  const [approved, setApproved] = React.useState([]);
  const [queried, setQuried] = React.useState([]);
  const [rejected, setRejected] = React.useState([]);

  // @ts-ignore
  // eslint-disable-next-line import/no-webpack-loader-syntax
  //mapboxgl.workerClass = require("worker-loader!mapbox-gl/dist/mapbox-gl-csp-worker").default;

  const handleChange = (event, value) => {
    setPage(value);
  };

  const handleStateChange = (event) => {
    console.log(event.target.value);
    setUserstate(event.target.value);
  };
  const handleProjectChange = (event) => {
    console.log(event.target.value);
    setProject(event.target.value);
  };
  const handleLgaChange = (event) => {
    console.log(event.target.value);
    setLga(event.target.value);
  };

  const title = "Reports";
  const states = [
    {
      code: "FC",
      name: "Abuja",
      lgas: ["Abuja", "Kwali", "Kuje", "Gwagwalada", "Bwari", "Abaji"],
    },
    {
      code: "AB",
      name: "Abia",
      lgas: [
        "Aba North",
        "Aba South",
        "Arochukwu",
        "Bende",
        "Ikawuno",
        "Ikwuano",
        "Isiala-Ngwa North",
        "Isiala-Ngwa South",
        "Isuikwuato",
        "Umu Nneochi",
        "Obi Ngwa",
        "Obioma Ngwa",
        "Ohafia",
        "Ohaozara",
        "Osisioma",
        "Ugwunagbo",
        "Ukwa West",
        "Ukwa East",
        "Umuahia North",
        "Umuahia South",
      ],
    },
    {
      code: "AD",
      name: "Adamawa",
      lgas: [
        "Demsa",
        "Fufore",
        "Ganye",
        "Girei",
        "Gombi",
        "Guyuk",
        "Hong",
        "Jada",
        "Lamurde",
        "Madagali",
        "Maiha",
        "Mayo-Belwa",
        "Michika",
        "Mubi-North",
        "Mubi-South",
        "Numan",
        "Shelleng",
        "Song",
        "Toungo",
        "Yola North",
        "Yola South",
      ],
    },
    {
      code: "AK",
      name: "AkwaIbom",
      lgas: [
        "Abak",
        "Eastern-Obolo",
        "Eket",
        "Esit-Eket",
        "Essien-Udim",
        "Etim-Ekpo",
        "Etinan",
        "Ibeno",
        "Ibesikpo-Asutan",
        "Ibiono-Ibom",
        "Ika",
        "Ikono",
        "Ikot-Abasi",
        "Ikot-Ekpene",
        "Ini",
        "Itu",
        "Mbo",
        "Mkpat-Enin",
        "Nsit-Atai",
        "Nsit-Ibom",
        "Nsit-Ubium",
        "Obot-Akara",
        "Okobo",
        "Onna",
        "Oron",
        "Oruk Anam",
        "Udung-Uko",
        "Ukanafun",
        "Urue-Offong/Oruko",
        "Uruan",
        "Uyo",
      ],
    },
    {
      code: "AN",
      name: "Anambra",
      lgas: [
        "Aguata",
        "Anambra East",
        "Anambra West",
        "Anaocha",
        "Awka North",
        "Awka South",
        "Ayamelum",
        "Dunukofia",
        "Ekwusigo",
        "Idemili-North",
        "Idemili-South",
        "Ihiala",
        "Njikoka",
        "Nnewi-North",
        "Nnewi-South",
        "Ogbaru",
        "Onitsha-North",
        "Onitsha-South",
        "Orumba-North",
        "Orumba-South",
      ],
    },
    {
      code: "BA",
      name: "Bauchi",
      lgas: [
        "Alkaleri",
        "Bauchi",
        "Bogoro",
        "Damban",
        "Darazo",
        "Dass",
        "Gamawa",
        "Ganjuwa",
        "Giade",
        "Itas Gadau",
        "Jama'Are",
        "Katagum",
        "Kirfi",
        "Misau",
        "Ningi",
        "Shira",
        "Tafawa-Balewa",
        "Toro",
        "Warji",
        "Zaki",
      ],
    },
    {
      code: "BY",
      name: "Bayelsa",
      lgas: [
        "Brass",
        "Ekeremor",
        "Kolokuma Opokuma",
        "Nembe",
        "Ogbia",
        "Sagbama",
        "Southern-Ijaw",
        "Yenagoa",
      ],
    },
    {
      code: "BE",
      name: "Benue",
      lgas: [
        "Ado",
        "Agatu",
        "Apa",
        "Buruku",
        "Gboko",
        "Guma",
        "Gwer-East",
        "Gwer-West",
        "Katsina-Ala",
        "Konshisha",
        "Kwande",
        "Logo",
        "Makurdi",
        "Ogbadibo",
        "Ohimini",
        "Oju",
        "Okpokwu",
        "Otukpo",
        "Tarka",
        "Ukum",
        "Ushongo",
        "Vandeikya",
      ],
    },
    {
      code: "BO",
      name: "Borno",
      lgas: [
        "Abadam",
        "Askira-Uba",
        "Bama",
        "Bayo",
        "Biu",
        "Chibok",
        "Damboa",
        "Dikwa",
        "Gubio",
        "Guzamala",
        "Gwoza",
        "Hawul",
        "Jere",
        "Kaga",
        "Kala Balge",
        "Konduga",
        "Kukawa",
        "Kwaya-Kusar",
        "Mafa",
        "Magumeri",
        "Maiduguri",
        "Marte",
        "Mobbar",
        "Monguno",
        "Ngala",
        "Nganzai",
        "Shani",
      ],
    },
    {
      code: "CR",
      name: "CrossRiver",
      lgas: [
        "Abi",
        "Akamkpa",
        "Akpabuyo",
        "Bakassi",
        "Bekwarra",
        "Biase",
        "Boki",
        "Calabar-Municipal",
        "Calabar-South",
        "Etung",
        "Ikom",
        "Obanliku",
        "Obubra",
        "Obudu",
        "Odukpani",
        "Ogoja",
        "Yakurr",
        "Yala",
      ],
    },
    {
      code: "DE",
      name: "Delta",
      lgas: [
        "Aniocha North",
        "Aniocha-North",
        "Aniocha-South",
        "Bomadi",
        "Burutu",
        "Ethiope-East",
        "Ethiope-West",
        "Ika-North-East",
        "Ika-South",
        "Isoko-North",
        "Isoko-South",
        "Ndokwa-East",
        "Ndokwa-West",
        "Okpe",
        "Oshimili-North",
        "Oshimili-South",
        "Patani",
        "Sapele",
        "Udu",
        "Ughelli-North",
        "Ughelli-South",
        "Ukwuani",
        "Uvwie",
        "Warri South-West",
        "Warri North",
        "Warri South",
      ],
    },
    {
      code: "EB",
      name: "Ebonyi",
      lgas: [
        "Abakaliki",
        "Afikpo-North",
        "Afikpo South (Edda)",
        "Ebonyi",
        "Ezza-North",
        "Ezza-South",
        "Ikwo",
        "Ishielu",
        "Ivo",
        "Izzi",
        "Ohaukwu",
        "Onicha",
      ],
    },
    {
      code: "ED",
      name: "Edo",
      lgas: [
        "Akoko Edo",
        "Egor",
        "Esan-Central",
        "Esan-North-East",
        "Esan-South-East",
        "Esan-West",
        "Etsako-Central",
        "Etsako-East",
        "Etsako-West",
        "Igueben",
        "Ikpoba-Okha",
        "Oredo",
        "Orhionmwon",
        "Ovia-North-East",
        "Ovia-South-West",
        "Owan East",
        "Owan-West",
        "Uhunmwonde",
      ],
    },
    {
      code: "EK",
      name: "Ekiti",
      lgas: [
        "Ado-Ekiti",
        "Efon",
        "Ekiti-East",
        "Ekiti-South-West",
        "Ekiti-West",
        "Emure",
        "Gbonyin",
        "Ido-Osi",
        "Ijero",
        "Ikere",
        "Ikole",
        "Ilejemeje",
        "Irepodun Ifelodun",
        "Ise-Orun",
        "Moba",
        "Oye",
      ],
    },
    {
      code: "EN",
      name: "Enugu",
      lgas: [
        "Aninri",
        "Awgu",
        "Enugu-East",
        "Enugu-North",
        "Enugu-South",
        "Ezeagu",
        "Igbo-Etiti",
        "Igbo-Eze-North",
        "Igbo-Eze-South",
        "Isi-Uzo",
        "Nkanu-East",
        "Nkanu-West",
        "Nsukka",
        "Oji-River",
        "Udenu",
        "Udi",
        "Uzo-Uwani",
      ],
    },
    {
      code: "GO",
      name: "Gombe",
      lgas: [
        "Akko",
        "Balanga",
        "Billiri",
        "Dukku",
        "Funakaye",
        "Gombe",
        "Kaltungo",
        "Kwami",
        "Nafada",
        "Shongom",
        "Yamaltu Deba",
      ],
    },
    {
      code: "IM",
      name: "Imo",
      lgas: [
        "Aboh-Mbaise",
        "Ahiazu-Mbaise",
        "Ehime-Mbano",
        "Ezinihitte",
        "Ideato-North",
        "Ideato-South",
        "Ihitte Uboma",
        "Ikeduru",
        "Isiala-Mbano",
        "Isu",
        "Mbaitoli",
        "Ngor-Okpala",
        "Njaba",
        "Nkwerre",
        "Nwangele",
        "Obowo",
        "Oguta",
        "Ohaji-Egbema",
        "Okigwe",
        "Onuimo",
        "Orlu",
        "Orsu",
        "Oru-East",
        "Oru-West",
        "Owerri-Municipal",
        "Owerri-North",
        "Owerri-West",
      ],
    },
    {
      code: "JI",
      name: "Jigawa",
      lgas: [
        "Auyo",
        "Babura",
        "Biriniwa",
        "Birnin-Kudu",
        "Buji",
        "Dutse",
        "Gagarawa",
        "Garki",
        "Gumel",
        "Guri",
        "Gwaram",
        "Gwiwa",
        "Hadejia",
        "Jahun",
        "Kafin-Hausa",
        "Kaugama",
        "Kazaure",
        "Kiri kasama",
        "Maigatari",
        "Malam Madori",
        "Miga",
        "Ringim",
        "Roni",
        "Sule-Tankarkar",
        "Taura",
        "Yankwashi",
      ],
    },
    {
      code: "KD",
      name: "Kaduna",
      lgas: [
        "Birnin-Gwari",
        "Chikun",
        "Giwa",
        "Igabi",
        "Ikara",
        "Jaba",
        "Jema'A",
        "Kachia",
        "Kaduna-North",
        "Kaduna-South",
        "Kagarko",
        "Kajuru",
        "Kaura",
        "Kauru",
        "Kubau",
        "Kudan",
        "Lere",
        "Makarfi",
        "Sabon-Gari",
        "Sanga",
        "Soba",
        "Zangon-Kataf",
        "Zaria",
      ],
    },
    {
      code: "KN",
      name: "Kano",
      lgas: [
        "Ajingi",
        "Albasu",
        "Bagwai",
        "Bebeji",
        "Bichi",
        "Bunkure",
        "Dala",
        "Dambatta",
        "Dawakin-Kudu",
        "Dawakin-Tofa",
        "Doguwa",
        "Fagge",
        "Gabasawa",
        "Garko",
        "Garun-Mallam",
        "Gaya",
        "Gezawa",
        "Gwale",
        "Gwarzo",
        "Kabo",
        "Kano-Municipal",
        "Karaye",
        "Kibiya",
        "Kiru",
        "Kumbotso",
        "Kunchi",
        "Kura",
        "Madobi",
        "Makoda",
        "Minjibir",
        "Nasarawa",
        "Rano",
        "Rimin-Gado",
        "Rogo",
        "Shanono",
        "Sumaila",
        "Takai",
        "Tarauni",
        "Tofa",
        "Tsanyawa",
        "Tudun-Wada",
        "Ungogo",
        "Warawa",
        "Wudil",
      ],
    },
    {
      code: "KT",
      name: "Katsina",
      lgas: [
        "Bakori",
        "Batagarawa",
        "Batsari",
        "Baure",
        "Bindawa",
        "Charanchi",
        "Dan-Musa",
        "Dandume",
        "Danja",
        "Daura",
        "Dutsi",
        "Dutsin-Ma",
        "Faskari",
        "Funtua",
        "Ingawa",
        "Jibia",
        "Kafur",
        "Kaita",
        "Kankara",
        "Kankia",
        "Katsina",
        "Kurfi",
        "Kusada",
        "Mai-Adua",
        "Malumfashi",
        "Mani",
        "Mashi",
        "Matazu",
        "Musawa",
        "Rimi",
        "Sabuwa",
        "Safana",
        "Sandamu",
        "Zango",
      ],
    },
    {
      code: "KE",
      name: "Kebbi",
      lgas: [
        "Aleiro",
        "Arewa-Dandi",
        "Argungu",
        "Augie",
        "Bagudo",
        "Birnin-Kebbi",
        "Bunza",
        "Dandi",
        "Fakai",
        "Gwandu",
        "Jega",
        "Kalgo",
        "Koko-Besse",
        "Maiyama",
        "Ngaski",
        "Sakaba",
        "Shanga",
        "Suru",
        "Wasagu/Danko",
        "Yauri",
        "Zuru",
      ],
    },
    {
      code: "KO",
      name: "Kogi",
      lgas: [
        "Adavi",
        "Ajaokuta",
        "Ankpa",
        "Dekina",
        "Ibaji",
        "Idah",
        "Igalamela-Odolu",
        "Ijumu",
        "Kabba Bunu",
        "Kogi",
        "Lokoja",
        "Mopa-Muro",
        "Ofu",
        "Ogori Magongo",
        "Okehi",
        "Okene",
        "Olamaboro",
        "Omala",
        "Oyi",
        "Yagba-East",
        "Yagba-West",
      ],
    },
    {
      code: "KW",
      name: "Kwara",
      lgas: [
        "Asa",
        "Baruten",
        "Edu",
        "Ekiti (Araromi/Opin)",
        "Ilorin-East",
        "Ilorin-South",
        "Ilorin-West",
        "Isin",
        "Kaiama",
        "Moro",
        "Offa",
        "Oke-Ero",
        "Oyun",
        "Pategi",
      ],
    },
    {
      code: "LA",
      name: "Lagos",
      lgas: [
        "Agege",
        "Ajeromi-Ifelodun",
        "Alimosho",
        "Amuwo-Odofin",
        "Apapa",
        "Badagry",
        "Epe",
        "Eti-Osa",
        "Ibeju-Lekki",
        "Ifako-Ijaiye",
        "Ikeja",
        "Ikorodu",
        "Kosofe",
        "Lagos-Island",
        "Lagos-Mainland",
        "Mushin",
        "Ojo",
        "Oshodi-Isolo",
        "Shomolu",
        "Surulere",
        "Yewa-South",
      ],
    },
    {
      code: "NA",
      name: "Nassarawa",
      lgas: [
        "Akwanga",
        "Awe",
        "Doma",
        "Karu",
        "Keana",
        "Keffi",
        "Kokona",
        "Lafia",
        "Nasarawa",
        "Nasarawa-Eggon",
        "Obi",
        "Wamba",
        "Toto",
      ],
    },
    {
      code: "NI",
      name: "Niger",
      lgas: [
        "Agaie",
        "Agwara",
        "Bida",
        "Borgu",
        "Bosso",
        "Chanchaga",
        "Edati",
        "Gbako",
        "Gurara",
        "Katcha",
        "Kontagora",
        "Lapai",
        "Lavun",
        "Magama",
        "Mariga",
        "Mashegu",
        "Mokwa",
        "Moya",
        "Paikoro",
        "Rafi",
        "Rijau",
        "Shiroro",
        "Suleja",
        "Tafa",
        "Wushishi",
      ],
    },
    {
      code: "OG",
      name: "Ogun",
      lgas: [
        "Abeokuta-North",
        "Abeokuta-South",
        "Ado-Odo Ota",
        "Ewekoro",
        "Ifo",
        "Ijebu-East",
        "Ijebu-North",
        "Ijebu-North-East",
        "Ijebu-Ode",
        "Ikenne",
        "Imeko-Afon",
        "Ipokia",
        "Obafemi-Owode",
        "Odeda",
        "Odogbolu",
        "Ogun-Waterside",
        "Remo-North",
        "Shagamu",
        "Yewa North",
      ],
    },
    {
      code: "ON",
      name: "Ondo",
      lgas: [
        "Akoko North-East",
        "Akoko North-West",
        "Akoko South-West",
        "Akoko South-East",
        "Akure-North",
        "Akure-South",
        "Ese-Odo",
        "Idanre",
        "Ifedore",
        "Ilaje",
        "Ile-Oluji-Okeigbo",
        "Irele",
        "Odigbo",
        "Okitipupa",
        "Ondo West",
        "Ondo-East",
        "Ose",
        "Owo",
      ],
    },
    {
      code: "OS",
      name: "Osun",
      lgas: [
        "Atakumosa West",
        "Atakumosa East",
        "Ayedaade",
        "Ayedire",
        "Boluwaduro",
        "Boripe",
        "Ede South",
        "Ede North",
        "Egbedore",
        "Ejigbo",
        "Ife North",
        "Ife South",
        "Ife-Central",
        "Ife-East",
        "Ifelodun",
        "Ila",
        "Ilesa-East",
        "Ilesa-West",
        "Irepodun",
        "Irewole",
        "Isokan",
        "Iwo",
        "Obokun",
        "Odo-Otin",
        "Ola Oluwa",
        "Olorunda",
        "Oriade",
        "Orolu",
        "Osogbo",
      ],
    },
    {
      code: "OY",
      name: "Oyo",
      lgas: [
        "Afijio",
        "Akinyele",
        "Atiba",
        "Atisbo",
        "Egbeda",
        "Ibadan North",
        "Ibadan North-East",
        "Ibadan North-West",
        "Ibadan South-East",
        "Ibadan South-West",
        "Ibarapa-Central",
        "Ibarapa-East",
        "Ibarapa-North",
        "Ido",
        "Ifedayo",
        "Irepo",
        "Iseyin",
        "Itesiwaju",
        "Iwajowa",
        "Kajola",
        "Lagelu",
        "Ogo-Oluwa",
        "Ogbomosho-North",
        "Ogbomosho-South",
        "Olorunsogo",
        "Oluyole",
        "Ona-Ara",
        "Orelope",
        "Ori-Ire",
        "Oyo-West",
        "Oyo-East",
        "Saki-East",
        "Saki-West",
        "Surulere",
      ],
    },
    {
      code: "PL",
      name: "Plateau",
      lgas: [
        "Barkin-Ladi",
        "Bassa",
        "Bokkos",
        "Jos-East",
        "Jos-North",
        "Jos-South",
        "Kanam",
        "Kanke",
        "Langtang-North",
        "Langtang-South",
        "Mangu",
        "Mikang",
        "Pankshin",
        "Qua'an Pan",
        "Riyom",
        "Shendam",
        "Wase",
      ],
    },
    {
      code: "RI",
      name: "Rivers",
      lgas: [
        "Abua Odual",
        "Ahoada-East",
        "Ahoada-West",
        "Akuku Toru",
        "Andoni",
        "Asari-Toru",
        "Bonny",
        "Degema",
        "Eleme",
        "Emuoha",
        "Etche",
        "Gokana",
        "Ikwerre",
        "Khana",
        "Obio Akpor",
        "Ogba-Egbema-Ndoni",
        "Ogba Egbema Ndoni",
        "Ogu Bolo",
        "Okrika",
        "Omuma",
        "Opobo Nkoro",
        "Oyigbo",
        "Port-Harcourt",
        "Tai",
      ],
    },
    {
      code: "SO",
      name: "Sokoto",
      lgas: [
        "Binji",
        "Bodinga",
        "Dange-Shuni",
        "Gada",
        "Goronyo",
        "Gudu",
        "Gwadabawa",
        "Illela",
        "Kebbe",
        "Kware",
        "Rabah",
        "Sabon Birni",
        "Shagari",
        "Silame",
        "Sokoto-North",
        "Sokoto-South",
        "Tambuwal",
        "Tangaza",
        "Tureta",
        "Wamako",
        "Wurno",
        "Yabo",
      ],
    },
    {
      code: "TA",
      name: "Taraba",
      lgas: [
        "Ardo-Kola",
        "Bali",
        "Donga",
        "Gashaka",
        "Gassol",
        "Ibi",
        "Jalingo",
        "Karim-Lamido",
        "Kurmi",
        "Lau",
        "Sardauna",
        "Takum",
        "Ussa",
        "Wukari",
        "Yorro",
        "Zing",
      ],
    },
    {
      code: "YO",
      name: "Yobe",
      lgas: [
        "Bade",
        "Bursari",
        "Damaturu",
        "Fika",
        "Fune",
        "Geidam",
        "Gujba",
        "Gulani",
        "Jakusko",
        "Karasuwa",
        "Machina",
        "Nangere",
        "Nguru",
        "Potiskum",
        "Tarmuwa",
        "Yunusari",
        "Yusufari",
      ],
    },
    {
      code: "ZA",
      name: "Zamfara",
      lgas: [
        "Anka",
        "Bakura",
        "Birnin Magaji/Kiyaw",
        "Bukkuyum",
        "Bungudu",
        "Gummi",
        "Gusau",
        "Isa",
        "Kaura-Namoda",
        "Kiyawa",
        "Maradun",
        "Maru",
        "Shinkafi",
        "Talata-Mafara",
        "Tsafe",
        "Zurmi",
      ],
    },
  ];

  const handleSearch = async () => {
    const response = await fetch(`${API_BASE}/reports/search`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "X-RGM-PLATFORM": "Ad-hoc",
      },
      body: JSON.stringify({
        project_id: project,
        state: state,
        lga: lga,
      }),
    });
    const result = await response.json();
    console.log("Search", result);
    result && setReports(result.data.data);
    setTotalPages(result.data.last_page);
    setCountPerPage(result.data.per_page);
    setLoading(false);
  };

  const handleApprove = async (id) => {
    const response = await fetch(`${API_BASE}/report/${id}/action/0`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "X-RGM-PLATFORM": "Ad-hoc",
      },
    });
    const result = await response.json();
    getReports();
  };

  const handleReject = async (id) => {
    const response = await fetch(`${API_BASE}/report/${id}/action/1`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "X-RGM-PLATFORM": "Ad-hoc",
      },
    });
    const result = await response.json();
    getReports();
  };

  const handleQuery = async (id) => {
    const response = await fetch(`${API_BASE}/report/${id}/action/2`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "X-RGM-PLATFORM": "Ad-hoc",
      },
    });
    const result = await response.json();
    getReports();
  };

  const getReports = async () => {
    const response = await fetch(`${API_BASE}/reports?page=${page}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "X-RGM-PLATFORM": localStorage.getItem("platform"),
      },
    });
    const result = await response.json();
    result && setReports(result.data.data);
    setReportsData(result.data.data);
    setTotalPages(result.data.last_page);
    setCountPerPage(result.data.per_page);
    setLoading(false);
    console.log("Reports", result);
  };

  const getUser = async () => {
    try {
      const response = await fetch(
        `${API_BASE}/user/${localStorage.getItem("user")}`,
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      const result = await response.json();
      const data = result.data;
      setUser(data);
      console.log("User:", result);
    } catch (error) {
      console.log(error);
    }
  };

  const getProjects = async () => {
    const response = await fetch(`${API_BASE}/projects`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    const result = await response.json();
    setLoading(false);
    result && setProjects(result.data);
    console.log("Projects", result);
  };

  const getComments = async (uuid) => {
    const response = await fetch(`${API_BASE}/queried/${uuid}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    const result = await response.json();
    result && setCommentz(result.data);
    console.log("Comments", result);
  };

  const handleApproved = async (term) => {
    const response = await fetch(`${API_BASE}/reports/${term}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    const result = await response.json();
    result && setReports(result.data.data);
    setTotalPages(result.data.last_page);
    setCountPerPage(result.data.per_page);
    setLoading(false);
    console.log("Approved", result);
  };

  React.useEffect(() => {
    getUser();
    getProjects();
  }, []);

  React.useEffect(() => {
    getReports();
  }, [page]);

  const data = React.useMemo(() => reports);

  const fuse = new Fuse(data, {
    threshold: 0.5,
    includeMatches: true,
    keys: [
      "message",
      "user.State",
      "user.lga",
      ["user.projects"],
      "user.projects.title",
    ],
  });
  const results = fuse.search(filterTerm);
  console.log("result", results);
  const filterResults = results.map((item) => item.item);

  const headers = [
    { label: "Message", key: "message" },
    { label: "Longitude", key: "longitude" },
    { label: "Latitude", key: "latitude" },
    { label: "User", key: "user.name" },
  ];

  const csvData =
    filterTerm == ""
      ? data.map((row) => ({
          ...row,
          users: JSON.stringify(row.users),
        }))
      : filterResults.map((row) => ({
          ...row,
          users: JSON.stringify(row.users),
        }));

  const csvReport = {
    data: csvData,
    headers: headers,
    filename: `${Date.now()}_Project_Report.csv`,
  };

  const infos = [
    {
      title: "Total Reports",
      color: "rgb(17 76 168)",
      image: BlueBG,
      data: reportsData.length,
    },
    {
      title: "Approved",
      color: "#035C36",
      image: GreenBG,
      data: reportsData.filter((report) => report.status === "Approved").length,
    },
    {
      title: "Pending",
      color: "rgb(209 148 35)",
      image: OrangeBG,
      data: reportsData.filter((report) => report.status === "Pending").length,
    },

    {
      title: "Disapproved",
      color: "#0D0709",
      image: RedBG,
      data: reportsData.filter((report) => report.status === "Rejected").length,
    },
    {
      title: "Queried",
      color: "#DD411A",
      image: YellowBG,
      data: reportsData.filter((report) => report.status === "Queried").length,
    },
  ];

  const defaultProps = {
    center: {
      lat: 59.95,
      lng: 30.33,
    },
    zoom: 11,
  };

  const columns = [
    {
      selector: "photo_1",
      name: "",
      cell: (row) => {
        return (
          <Item.Avatar
            src={`${API_BASE_UPLOADS}/${row.photo_1}`}
            variant="square"
          />
        );
      },
    },
    {
      selector: "message",
      name: "Comment",
      sortable: true,
      cell: (row) => {
        return row.message == null ? (
          <span>N/A</span>
        ) : (
          <span>{row.message}</span>
        );
      },
    },
    {
      selector: "latitude",
      name: "Location",
      sortable: true,
      cell: (row) => {
        return (
          <MapModal
            apiKey="pk.eyJ1IjoibWljaG9sdXNhbnlhIiwiYSI6ImNrd3MybWM4YjEyOGwycHFvaDhsc2Z2Y3AifQ.uSFsVJGkOiUXSTG2SOES2A"
            latitude={parseFloat(row.latitude)}
            longitude={parseFloat(row.longitude)}
          />
        );
      },
    },
    { selector: "user.name", name: "User", sortable: true },
    // { selector: "status", name: "Status", sortable: true },
    {
      selector: "created_at",
      name: "Submitted",
      sortable: true,
      ignoreRowClick: true,
      cell: (row) => {
        return <Moment fromNow>{row.created_at}</Moment>;
      },
    },
    {
      selector: "id",
      name: "Action",
      sortable: true,
      ignoreRowClick: true,
      cell: (row) => {
        return (
          <div>
            <ReportModal
              status={row.status}
              photo1={row.photo_1 !=null ? `${API_BASE_UPLOADS}/${row.photo_1}`:null}
              photo2={row.photo_2 !=null ? `${API_BASE_UPLOADS}/${row.photo_2}` :null}
              photo3={row.photo_3 !=null ? `${API_BASE_UPLOADS}/${row.photo_3}` :null}
              photo4={row.photo_4 !=null ? `${API_BASE_UPLOADS}/${row.photo_4}` :null}
              latitude={parseFloat(row.latitude)}
              longitude={parseFloat(row.longitude)}
              apiKey="pk.eyJ1IjoibWljaG9sdXNhbnlhIiwiYSI6ImNrd3MybWM4YjEyOGwycHFvaDhsc2Z2Y3AifQ.uSFsVJGkOiUXSTG2SOES2A"
              approve={() => handleApprove(row.id)}
              reject={() => handleReject(row.id)}
              query={() => handleQuery(row.id)}
              comments={() => getComments(row.uuid)}
              commentz={commentz}
            />
            {/* {row.status === "Queried" && (
              <ReportQuery uuid={row.uuid} reportId={row.id} />
            )} */}
          </div>
        );
      },
    },
  ];

  return (
    <div>
      <div className="flex flex-row">
        <div className="dashboard-left">
          <Sidebar />
        </div>

        <div className="dashboard-right">
          <Header
            user={user}
            title={localStorage.getItem("platform") + " " + title.toUpperCase()}
          />
          {/* <h3 className="mx-5 mt-5 mb-3 font-bold text-gray-700 text-2xl">
            {localStorage.getItem("platform")} Reports
          </h3> */}
          <div className="p-2 m-2 grid md:grid-cols-5 gap-1 content-center">
            {/* <div
              className="flex flex-col justify-center items-center shadow-md"
              style={{
                width: 180,
                height: 180,
                background: "#043C2D",
                margin: 10,
                borderRadius: "20px",
              }}
            >
              <div className="report-item flex flex-row justify-center items-center text-white">
                <Badge variant="dot" color="error">
                  <h2 className="text-4xl mr-3">15</h2>
                </Badge>
                <span>New Reports</span>
              </div>
              <div
                style={{ color: "#49BF78" }}
                className="report-item flex flex-row justify-center items-center text-white"
              >
                <h4 className="text-xl mr-2">7</h4>
                <span className="text-sm">Citizen Reports</span>
              </div>
              <div
                style={{ color: "#CEFF68" }}
                className="report-item flex flex-row justify-center items-center text-white"
              >
                <h4 className="text-xl mr-2">8</h4>
                <span className="text-sm">Inspection Reports</span>
              </div>
            </div> */}
            {infos.map((info) => (
              <TopCards info={info} />
            ))}
          </div>
          <hr />
          <div className="my-3 flex flex-row justify-evenly items-center">
            <div>
              <h3>Filter: </h3>
              <CSVLink className="flex flex-row" {...csvReport}>
                {" "}
                <Icons.Download />
              </CSVLink>
            </div>
            <Box sx={{ minWidth: 200 }}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Project</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={project}
                  label="Project"
                  onChange={handleProjectChange}
                >
                  <MenuItem value="">Select Project</MenuItem>
                  {projects &&
                    projects.map((item, i) => (
                      <MenuItem value={item.id} key={i}>
                        {item.title}
                      </MenuItem>
                    ))}
                </Select>
              </FormControl>
            </Box>
            <Box sx={{ minWidth: 200 }}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">State</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={state}
                  label="State"
                  onChange={handleStateChange}
                >
                  <MenuItem value="">Select State</MenuItem>
                  {states &&
                    states.map((item, i) => (
                      <MenuItem value={item.name} key={i}>
                        {item.name}
                      </MenuItem>
                    ))}
                </Select>
              </FormControl>
            </Box>
            <Box sx={{ minWidth: 200 }}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">LGA</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={lga}
                  label="LGA"
                  onChange={handleLgaChange}
                >
                  <MenuItem value="">Select LGA</MenuItem>
                  {states &&
                    states
                      .filter((s) => s.name === state)
                      .map((item, i) =>
                        item.lgas.map((lg, i) => (
                          <MenuItem value={lg} key={i}>
                            {lg}
                          </MenuItem>
                        ))
                      )}
                </Select>
              </FormControl>
            </Box>

            {/* <Item.Button
              onClick={handleSearch}
              className="user-button"
              variant="contained"
            >
              Filter
            </Item.Button> */}

            {/* <Box sx={{ minWidth: 200 }}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">
                  Filter by Status
                </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  label="Filter by Status"
                  onChange={(e) => handleApproved(e.target.value)}
                >
                  <MenuItem>Select Status</MenuItem>

                  <MenuItem value="approved">Approved</MenuItem>
                  <MenuItem value="pending">Pending</MenuItem>
                  <MenuItem value="queried">Queried</MenuItem>
                  <MenuItem value="rejected">Rejected</MenuItem>
                </Select>
              </FormControl>
            </Box> */}
          </div>
          <hr />
          <ProjectTable columns={columns} data={data} total={countPerPage} />
          <PaginationComponent
            page={page}
            defaultPage={page}
            count={totalPages}
            handleChange={handleChange}
          />
        </div>
      </div>
    </div>
  );
}

export default CitizenReports;

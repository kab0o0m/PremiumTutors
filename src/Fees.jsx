  const fees = {
    "pre school": {
      ptt: "$25 - $30",
      ftt: "$35 - $45",
      moe: "$50 - $70",
    },
    nursery: {
      ptt: "$25 - $30",
      ftt: "$35 - $45",
      moe: "$50 - $70",
    },
    "kindergarten 1": {
      ptt: "$25 - $30",
      ftt: "$35 - $45",
      moe: "$50 - $70",
    },
    "kindergarten 2": {
      ptt: "$25 - $30",
      ftt: "$35 - $45",
      moe: "$50 - $70",
    },
    "primary 1": {
      ptt: "$25 - $30",
      ftt: "$35 - $45",
      moe: "$50 - $70",
    },
    "primary 2": {
      ptt: "$25 - $30",
      ftt: "$35 - $45",
      moe: "$50 - $70",
    },
    "primary 3": {
      ptt: "$25 - $30",
      ftt: "$35 - $45",
      moe: "$50 - $70",
    },
    "primary 4": {
      ptt: "$30 - $35",
      ftt: "$40 - $50",
      moe: "$60 - $80",
    },
    "primary 5": {
      ptt: "$30 - $35",
      ftt: "$40 - $50",
      moe: "$60 - $80",
    },
    "primary 6": {
      ptt: "$30 - $35",
      ftt: "$40 - $50",
      moe: "$60 - $80",
    },
    "secondary 1": {
      ptt: "$35 - $40",
      ftt: "$45 - $55",
      moe: "$65 - $85",
    },
    "secondary 2": {
      ptt: "$35 - $40",
      ftt: "$45 - $55",
      moe: "$65 - $85",
    },
    "secondary 3": {
      ptt: "$35 - $45",
      ftt: "$45 - $60",
      moe: "$70 - $95",
    },
    "secondary 4": {
      ptt: "$35 - $45",
      ftt: "$45 - $60",
      moe: "$70 - $95",
    },
    "secondary 5": {
      ptt: "$35 - $45",
      ftt: "$45 - $60",
      moe: "$70 - $95",
    },
    "junior college": {
      ptt: "$40 - $55",
      ftt: "$60 - $80",
      moe: "$90 - $120",
    },
    "junior college 1": {
      ptt: "$40 - $55",
      ftt: "$60 - $80",
      moe: "$90 - $120",
    },
    "junior college 2": {
      ptt: "$40 - $55",
      ftt: "$60 - $80",
      moe: "$90 - $120",
    },
    igcse: {
      ptt: "$35 - $50",
      ftt: "$45 - $75",
      moe: "$60 - $110",
    },
    "igcse 1": {
      ptt: "$40 - $45",
      ftt: "$50 - $60",
      moe: "$65 - $85",
    },
    "igcse 2": {
      ptt: "$40 - $45",
      ftt: "$50 - $60",
      moe: "$65 - $85",
    },
    "igcse 3": {
      ptt: "$40 - $45",
      ftt: "$55 - $65",
      moe: "$70 - $95",
    },
    "igcse 4": {
      ptt: "$40 - $45",
      ftt: "$55 - $65",
      moe: "$70 - $95",
    },

    "ib diploma": {
      ptt: "$40 - $55",
      ftt: "$65 - $85",
      moe: "$90 - $120",
    },
    polytechnic: {
      ptt: "$40 - $60",
      ftt: "$60 - $95",
      moe: "$100 - $130",
    },
    university: {
      ptt: "$40 - $60",
      ftt: "$60 - $95",
      moe: "$100 - $130",
    },
    "adult learner": {
      ptt: "$35 - $45",
      ftt: "$50 - $70",
      moe: "$70 - $100",
    },
    beginner: {
      piano: "$40 - $45",
      guitar: "$35 - $45",
      violin: "$50 - $60",
      drums: "$55 - $65",
      ukulele: "$35 - $45",
      vocals: "$45 - $60",
    },
    intermediate: {
      vocals: "$60 - $80",
    },
    advanced: {
      vocals: "$85 - $100"
    },
    "grade 1": {
      piano: "$45 - $55",
      guitar: "$40 - $50",
      violin: "$50 - $60",
      drums: "$55 - $65",
      ukulele: "$40 - $50",
    },
    "grade 2": {
      piano: "$45 - $60",
      guitar: "$45 - $55",
      violin: "$55 - $65",
      drums: "$60 - $70",
      ukulele: "$45 - $55",
    },
    "grade 3": {
      piano: "$50 - $60",
      guitar: "$50 - $55",
      violin: "$50 - $55",
      drums: "$65 - $70",
      ukulele: "$55 - $60",
    },
    "grade 4": {
      piano: "$50 - $70",
      guitar: "$50 - $60",
      violin: "$60 - $75",
      drums: "$70 - $80",
      ukulele: "$50 - $60",
    },
    "grade 5": {
      piano: "$55 - $75",
      guitar: "$55 - $65",
      violin: "$65 - $75",
      drums: "$75 - $85",
      ukulele: "$55 - $65",
    },
    "grade 6": {
      piano: "$60 - $80",
      guitar: "$60 - $70",
      violin: "$70 - $80",
      drums: "$85 - $95",
      ukulele: "$60 - $70",
    },
    "grade 7": {
      piano: "$65 - $85",
      guitar: "$65 - $70",
      violin: "$75 - $90",
      drums: "$90 - $100",
      ukulele: "$65 - $70",
    },
    "grade 8": {
      piano: "$70 - $90",
      guitar: "$70 - $80",
      violin: "$80 - $100",
      drums: "$95 - $110",
      ukulele: "$70 - $80",
    },
    diploma: {
      piano: "$75 & above",
      guitar: "$75 & above",
      violin: "$90 & above",
      drums: "$95 & above",
      ukulele: "$75 & above",
    },
    leisure: {
      piano: "$40 - $70",
    },
    tennis: {
      private: "$60 - $75",
      pair: "$90 - $100",
      group: "$110 - $130",
    },
    badminton: {
      private: "$50 - $60",
      pair: "$60 - $80",
      group: "$80 - $100",
    },
  };

  export default fees;

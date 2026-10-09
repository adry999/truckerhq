// Carrier Health Score bands: >=80 GOOD, 60-79 WATCH, <60 RISK.
export function healthColor(score: number): string {
  if (score >= 80) return "#0E5C3A";
  if (score >= 60) return "#F2A900";
  return "#B42318";
}

export function healthOnColor(score: number): string {
  return score >= 60 && score < 80 ? "#16181B" : "#F7F7F5";
}

export function healthTextColor(score: number): string {
  if (score >= 80) return "#0E5C3A";
  if (score >= 60) return "#7A5300";
  return "#B42318";
}

export function healthLabel(score: number): string {
  if (score >= 80) return "GOOD";
  if (score >= 60) return "WATCH";
  return "RISK";
}

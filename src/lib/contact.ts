export const WHATSAPP_NUMBER = "5547997071394";
export const WHATSAPP_DISPLAY = "(47) 99707-1394";
export const INSTAGRAM_URL = "https://www.instagram.com/stefaniepfortes/";
export const MAPS_URL =
  "https://www.google.com/maps/place/Est%C3%A9tica+Stefanie+Probst+Fortes/@-26.8815568,-49.0546154,17z/data=!3m1!4b1!4m6!3m5!1s0x94df1f30df37ab67:0x5d8828d16e8ba03d!8m2!3d-26.8815568!4d-49.0546154!16s%2Fg%2F11vst805df";

export const MESSAGES = {
  hero: "Olá, Stefanie! Conheci seu site e gostaria de saber sobre os atendimentos e horários disponíveis.",
  limpeza: "Olá, Stefanie! Gostaria de saber mais sobre a limpeza de pele e consultar os horários disponíveis.",
  dermaplaning: "Olá, Stefanie! Tenho interesse em dermaplaning. Poderia me passar mais informações?",
  sobrancelhas: "Olá, Stefanie! Gostaria de saber mais sobre o atendimento para sobrancelhas e os horários disponíveis.",
  final: "Olá, Stefanie! Gostaria de agendar um atendimento. Pode me ajudar?",
} as const;

export function whatsappUrl(message: string) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

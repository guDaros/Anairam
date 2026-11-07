// Global constants for easy modification
export const LAWYER_NAME = "Anairam de Souza Silva";
export const LAWYER_NAME_SIMPLIFIED = "Anairam Souza";
export const LAWYER_OFFICE = "ANAIRAM SOUZA SOCIEDADE INDIVIDUAL DE ADVOCACIA";
export const CNPJ_NUMBER = "65.124.096/0001-45";
export const EMAIL = "contato@anairamsouza.adv.br";
export const INSTAGRAM = "https://www.instagram.com/anairamadv/";
export const INSTAGRAM_HANDLE = "@anairamadv";
export const INSTAGRAM_FEED_URL = "https://feeds.behold.so/a7Z36D3pCvRMcwgn1g0r";
export const CURRENT_YEAR = new Date().getFullYear();

export const WHATSAPP_NUMBER_PR = "+554198536115";
export const WHATSAPP_DISPLAY_PR = "(41) 9 9853-6115";
export const WHATSAPP_LINK_PR = `https://wa.me/${WHATSAPP_NUMBER_PR.replace(/\D/g, '')}?text=Olá, gostaria de agendar uma consulta`;
export const OAB_NUMBER_PR = "OAB/PR 128.221";


export const WHATSAPP_NUMBER_BH = "+5575981653315";
export const WHATSAPP_DISPLAY_BH = "(75) 9 8165-3315";
export const WHATSAPP_LINK_BH = `https://wa.me/${WHATSAPP_NUMBER_BH.replace(/\D/g, '')}?text=Olá, gostaria de agendar uma consulta`;
export const OAB_NUMBER_BA = "OAB/BA 92.154";

// Página de links (/falecomigo) — usada na bio do Instagram
export const SITE_URL = "https://www.anairamsouza.adv.br/";
export const LINKS_INSTAGRAM_MESSAGE = "Olá, vim pelo Instagram e gostaria de atendimento.";
export const LINKS_WHATSAPP_PR = `https://wa.me/${WHATSAPP_NUMBER_PR.replace(/\D/g, '')}?text=${encodeURIComponent(LINKS_INSTAGRAM_MESSAGE)}`;
export const LINKS_WHATSAPP_BA = `https://wa.me/${WHATSAPP_NUMBER_BH.replace(/\D/g, '')}?text=${encodeURIComponent(LINKS_INSTAGRAM_MESSAGE)}`;
export const LINKS_SITE_URL = `${SITE_URL}?utm_source=ig&utm_medium=social&utm_content=link_in_bio`;
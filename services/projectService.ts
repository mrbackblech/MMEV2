import { GalleryImage } from '../types';

// Wir nutzen Umgebungsvariablen für Sicherheit und Flexibilität
const API_URL = process.env.API_URL || "http://100.78.117.19:8090";
const API_KEY = process.env.API_KEY;
const API_SECRET = process.env.API_SECRET;

/**
 * Ruft Projekte aus der ERPNext Instanz ab.
 */
export const fetchERPNextProjects = async (): Promise<GalleryImage[]> => {
  if (!API_KEY || !API_SECRET) {
    console.warn("ERPNext API Credentials fehlen. Nutze Fallback-Daten.");
    return [];
  }

  try {
    const fields = JSON.stringify(["name", "project_name", "expected_end_date", "status", "image", "notes"]);
    const response = await fetch(`${API_URL}/api/resource/Project?fields=${fields}`, {
      headers: {
        'Authorization': `token ${API_KEY}:${API_SECRET}`,
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) throw new Error("Netzwerkantwort war nicht ok");

    const { data } = await response.json();

    return data.map((p: any, index: number) => ({
      id: p.name || index,
      url: p.image ? (p.image.startsWith('http') ? p.image : `${API_URL}${p.image}`) : `https://picsum.photos/1600/900?random=${index + 100}`,
      title: p.project_name || "Unbenanntes Projekt",
      category: p.status || "Event",
      location: "In Planung",
      date: p.expected_end_date ? new Date(p.expected_end_date).toLocaleDateString('de-DE', { day: '2-digit', month: 'long', year: 'numeric' }) : "Demnächst",
      description: p.notes || "Ein exklusives MM EVENT Projekt in der Realisierungsphase.",
      highlights: ["Individuelle Planung", "Professionelle Begleitung", p.status],
      additionalImages: []
    }));

  } catch (error) {
    console.error("Fehler beim Laden der ERPNext Projekte:", error);
    throw error;
  }
};

/**
 * Erstellt einen neuen Lead in ERPNext basierend auf den Formulardaten.
 */
export const createLead = async (leadData: { name: string, email: string, message: string }) => {
  if (!API_KEY || !API_SECRET) {
    throw new Error("ERPNext API Credentials fehlen.");
  }

  const formData = {
    first_name: leadData.name,
    email_id: leadData.email,
    message: leadData.message,
    source: "Webseite"
  };

  const response = await fetch(`${API_URL}/api/resource/Lead`, {
    method: 'POST',
    headers: {
      'Authorization': `token ${API_KEY}:${API_SECRET}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(formData)
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData._server_messages || "Fehler beim Senden des Formulars.");
  }

  return await response.json();
};
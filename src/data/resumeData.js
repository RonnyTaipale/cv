import YAML from "yaml";

const yamlModules = import.meta.glob(["./*.yml", "../*.yml"], {
  query: "?raw",
  import: "default",
  eager: true,
});

const readYaml = (name) => {
  const localKey = `./${name}`;
  const parentKey = `../${name}`;
  const contents = yamlModules[localKey] ?? yamlModules[parentKey];
  if (!contents) {
    throw new Error(`Missing data file: ${name}`);
  }
  return YAML.parse(contents);
};

const config = readYaml("site_settings.yml");
const header = readYaml("header.yml");

const toBool = (value) => value === true || value === "true" || value === "yes";

const site = {
  title: config.title,
  description: config.description,
  url: config.url,
  baseurl: config.baseurl ?? "",
  resumeAvatar: toBool(config.resume_avatar),
  resumeName: config.resume_name,
  resumeTitle: header.title ?? header.resume_title,
  resumeContactEmail: config.resume_contact_email,
  resumeContactTelephone: config.resume_contact_telephone,
  resumeContactAddress: config.resume_contact_address,
  resumeHeaderContactInfo: config.resume_header_contact_info,
  displayHeaderContactInfo: toBool(config.display_header_contact_info),
  resumeHeaderIntro: header.intro ?? header.resume_header_intro,
  resumeFooter: config.resume_footer ?? "",
  resumeLookingForWork: config.resume_looking_for_work ?? null,
  resumeTheme: config.resume_theme,
  resumeSocialLinks: config.resume_social_links ?? {},
  resumePrintSocialLinks: toBool(config.resume_print_social_links),
  sections: {
    experience: !!config.resume_section_experience,
    education: !!config.resume_section_education,
    projects: !!config.resume_section_projects,
    skills: !!config.resume_section_skills,
    certifications: !!config.resume_section_certifications,
    recognition: !!config.resume_section_recognition,
    associations: !!config.resume_section_associations,
    interests: !!config.resume_section_interests,
    links: !!config.resume_section_links,
  },
};

const experience = readYaml("experience.yml") ?? [];
const education = readYaml("education.yml") ?? [];
const projects = readYaml("projects.yml") ?? [];
const skills = readYaml("skills.yml") ?? [];
const certifications = readYaml("certifications.yml") ?? [];
const recognitions = readYaml("recognitions.yml") ?? [];
const associations = readYaml("associations.yml") ?? [];
const interests = readYaml("interests.yml") ?? [];
const links = readYaml("links.yml") ?? [];

export {
  site,
  experience,
  education,
  projects,
  skills,
  certifications,
  recognitions,
  associations,
  interests,
  links,
};

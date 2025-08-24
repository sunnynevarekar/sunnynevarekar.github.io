/**
 * Extracts a description from blog post content
 * @param {string} content - The markdown content of the blog post
 * @param {number} maxLength - Maximum length of the description (default: 160)
 * @returns {string} - Cleaned description text
 */
export function extractDescription(content, maxLength = 160) {
  if (!content) return '';
  
  // Remove frontmatter (everything between --- markers)
  const contentWithoutFrontmatter = content.replace(/^---[\s\S]*?---\s*/m, '');
  
  // Split into paragraphs and get the first non-empty one
  const paragraphs = contentWithoutFrontmatter
    .split(/\n\s*\n/)
    .map(p => p.trim())
    .filter(p => p.length > 0);
  
  let firstParagraph = paragraphs[0] || '';
  
  // Remove markdown syntax
  firstParagraph = firstParagraph
    // Remove headers
    .replace(/^#{1,6}\s+/gm, '')
    // Remove bold/italic
    .replace(/\*\*(.*?)\*\*/g, '$1')
    .replace(/\*(.*?)\*/g, '$1')
    // Remove links
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
    // Remove code blocks
    .replace(/```[\s\S]*?```/g, '')
    .replace(/`([^`]+)`/g, '$1')
    // Remove list markers
    .replace(/^[-*+]\s+/gm, '')
    .replace(/^\d+\.\s+/gm, '')
    // Clean up extra whitespace
    .replace(/\s+/g, ' ')
    .trim();
  
  // Truncate to maxLength and add ellipsis if needed
  if (firstParagraph.length > maxLength) {
    // Find the last complete word within the limit
    const truncated = firstParagraph.substring(0, maxLength);
    const lastSpace = truncated.lastIndexOf(' ');
    
    if (lastSpace > maxLength * 0.8) {
      firstParagraph = truncated.substring(0, lastSpace) + '...';
    } else {
      firstParagraph = truncated + '...';
    }
  }
  
  return firstParagraph;
}
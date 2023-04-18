import { parseHeaderToMarkdown } from "./BlockTypeParsers/HeaderTypeParser";
import { parseParagraphToMarkdown } from "./BlockTypeParsers/ParagraphTypeParser";
import { parseListToMarkdown } from "./BlockTypeParsers/ListTypeParser";
import { parseDelimiterToMarkdown } from "./BlockTypeParsers/DelimiterTypeParser";
import { parseImageToMarkdown } from "./BlockTypeParsers/ImageTypeParser";
import { parseCheckboxToMarkdown } from "./BlockTypeParsers/CheckboxTypeParser";
import { parseQuoteToMarkdown } from "./BlockTypeParsers/QuoteTypeParser";
import { parseCodeToMarkdown } from "./BlockTypeParsers/CodeTypeParser";

const blockToMarkdown = (content: any) => {
  const parsedData = content.map((item: any) => {
    // iterate through editor data and parse the single blocks to markdown syntax
    switch (item.type) {
      case "header":
        return parseHeaderToMarkdown(item.data);
      case "paragraph":
        return parseParagraphToMarkdown(item.data);
      case "list":
        return parseListToMarkdown(item.data);
      case "delimiter":
        return parseDelimiterToMarkdown();
      case "image":
        return parseImageToMarkdown(item.data);
      case "quote":
        return parseQuoteToMarkdown(item.data);
      case "checkbox":
        return parseCheckboxToMarkdown(item.data);
      case "code":
        return parseCodeToMarkdown(item.data);
      case "checklist":
        return parseCheckboxToMarkdown(item.data);
      default:
        break;
    }
  });
  return parsedData.join("\n");
};

export default blockToMarkdown;

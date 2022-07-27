if (figma.editorType === "figma") {
  figma.showUI(__html__, { themeColors: true });

  figma.ui.onmessage = (msg) => {
    figma.skipInvisibleInstanceChildren = true;
    const exact = msg.exact;
    const conceptual = msg.conceptual;
    if (msg.type === "set-bar") {
      const selection = figma.currentPage.selection;
      for (const node of selection) {
        const totalWidth = node.width;
        if ("children" in node) {
          for (const child of node.children) {
            console.log(totalWidth);
            if (child.name === "exact") {
              if (child.type === "RECTANGLE") {
                const width = (exact / 100) * totalWidth;
                child.resizeWithoutConstraints(width, child.height);
                console.log("exact width: ", width);
              }
            } else if (child.name === "conceptual") {
              if (child.type === "RECTANGLE") {
                const width = (conceptual / 100) * totalWidth;
                child.resizeWithoutConstraints(width, child.height);
                console.log("conceptual width: ", width);
              }
            }
          }
          // console.log(node);
        }
      }
    }
  };
} else {
}

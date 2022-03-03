document.writeln('<nav class="guide-nav">');
document.writeln('<ul class="nav nav-sidebar">');
document.writeln('<li><a href="#">Convention</a>');
document.writeln('<ol>');
document.writeln('<li><a href="../html/convention_html.html">HTML5</a></li>');
document.writeln('<li><a href="../html/convention_css.html">CSS</a></li>');
document.writeln('<li><a href="../html/convention_structure.html">Structure</a></li>');
document.writeln('<li><a href="../html/convention_naming.html">Naming</a></li>');
document.writeln('<li><a href="../html/convention_image.html">Image</a></li>');
document.writeln('<li><a href="../html/convention_ia.html">Information Architecture</a></li>');
document.writeln('</ol>');
document.writeln('</li>');
document.writeln('<li><a href="#">Layout</a>');
document.writeln('<ol>');
document.writeln('<li><a href="../html/layout_main.html">Main</a></li>');
document.writeln('<li><a href="../html/layout_sub.html">Sub</a></li>');
document.writeln('</ol>');
document.writeln('</li>');
document.writeln('<li><a href="#">Module</a>');
document.writeln('<ol>');
document.writeln('<li><a href="../html/module_table.html">Table</a></li>');
document.writeln('<li><a href="../html/module_form.html">Form</a></li>');
document.writeln('<li><a href="../html/module_button.html">Button</a></li>');
document.writeln('<li><a href="../html/module_menu.html">Menu</a></li>');
document.writeln('<li><a href="../html/module_list.html">List</a></li>');
document.writeln('<li><a href="../html/module_box.html">Box</a></li>');
document.writeln('<li><a href="../html/module_etc.html">Etc.</a></li>');
document.writeln('</ol>');
document.writeln('</li>');
document.writeln('<li><a href="../html/accessibility.html">Accessibility</a></li>');
document.writeln('<li><a href="../html/plug_plugin.html">Script</a></li>');
document.writeln('<li><a href="#">Convertor</a>');
document.writeln('<ol>');
document.writeln('<li><a href="../url-encoder/index.html" target="_blank">URL-encoder for SVG</a></li>');
document.writeln('<li><a href="../data-converter/index.html" target="_blank">data-convertor</a></li>');
document.writeln('<li><a href="../px_to_rem/index.html" target="_blank">rem convertor</a></li>');
document.writeln('<li><a href="../html/module_icon.html" target="_blank">icon list</a></li>');
document.writeln('</ol>');
document.writeln('</li>');
document.writeln('</ul>');
document.writeln('</nav>');

// menu indi.
function navMenu(d1, d2) {
    $('.nav').children().eq(d1).addClass('active').find("ol").show().find("li").eq(d2).addClass('inner_on');
}
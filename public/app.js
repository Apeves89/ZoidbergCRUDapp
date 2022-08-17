$(() => {
  
const addLinkBox = () => {
  const addBox = $('<input>').attr('type','url').addClass('form-control').attr('name','links').attr('id','InputAddLinks').attr('value','http://')
    $('#add-links').append(addBox)
}

const addImageBox = () => {
    const addImgBox = $('<input>').attr('type','url').addClass('form-control').attr('name','image').attr('id','InputImageLink')
      $('#add-image-link').append(addImgBox)
  }

$('#more-links').on('click', addLinkBox)
$('#image-links').on('click', addImageBox)


})
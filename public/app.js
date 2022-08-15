$(() => {
  
const addLinkBox = () => {
  const addBox = $('<input>').attr('type','url').addClass('form-control').attr('name','links').attr('id','InputAddLinks').attr('value','http://')
    $('#add-links').append(addBox)
}

$('#more-links').on('click', addLinkBox)


})
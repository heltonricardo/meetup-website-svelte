<script>
  import { createEventDispatcher } from "svelte";

  import { isEmpty, isValidEmail } from "../helpers/validation";

  import TextInput from "../UI/TextInput.svelte";
  import Button from "../UI/Button.svelte";
  import Modal from "../UI/Modal.svelte";

  const dispatch = createEventDispatcher();

  let title = "";
  $: titleValid = !isEmpty(title);

  let subtitle = "";
  $: subtitleValid = !isEmpty(subtitle);
  
  let address = "";
  $: addressValid = !isEmpty(address);
  
  let imageUrl = "";
  $: imageUrlValid = !isEmpty(imageUrl);
  
  let email = "";
  $: emailValid = isValidEmail(email);
  
  let description = "";
  $: descriptionValid = !isEmpty(description);
  

  function submitForm() {
    dispatch("save", {
      title,
      subtitle,
      address,
      imageUrl,
      email,
      description,
    });
  }
</script>

<style>
  form {
    width: 100%;
  }
</style>

<Modal title="New Meetup" on:cancel>
  <form on:submit|preventDefault={submitForm}>
    <TextInput
      id="title"
      label="Title"
      value={title}
      valid={titleValid}
      validityMessage="Please enter a valid title."
      on:input={(event) => (title = event.target.value)}
    />
    <TextInput
      id="subtitle"
      label="Subtitle"
      value={subtitle}
      valid={subtitleValid}
      validityMessage="Please enter a valid subtitle."
      on:input={(event) => (subtitle = event.target.value)}
    />
    <TextInput
      id="address"
      label="Address"
      value={address}
      valid={addressValid}
      validityMessage="Please enter a valid address."
      on:input={(event) => (address = event.target.value)}
    />
    <TextInput
      id="imageUrl"
      label="Image URL"
      value={imageUrl}
      valid={imageUrlValid}
      validityMessage="Please enter a valid image URL."
      on:input={(event) => (imageUrl = event.target.value)}
    />
    <TextInput
      id="email"
      label="E-mail"
      type="email"
      value={email}
      valid={emailValid}
      validityMessage="Please enter a valid e-mail."
      on:input={(event) => (email = event.target.value)}
    />
    <TextInput
      controlType="textarea"
      id="description"
      label="Description"
      value={description}
      valid={descriptionValid}
      validityMessage="Please enter a valid description."
      on:input={(event) => (description = event.target.value)}
    />
  </form>
  <div slot="footer">
    <Button type="button" mode="outline" on:click={() => dispatch("cancel")}
      >Cancel</Button
    >
    <Button type="button" on:click={submitForm}>Save</Button>
  </div>
</Modal>

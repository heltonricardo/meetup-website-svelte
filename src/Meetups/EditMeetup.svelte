<script>
  import { createEventDispatcher } from "svelte";
  import { isEmpty, isValidEmail } from "../helpers/validation";
  import meetups from "./meetups-store";
  import TextInput from "../UI/TextInput.svelte";
  import Button from "../UI/Button.svelte";
  import Modal from "../UI/Modal.svelte";

  export let id = null;

  const dispatch = createEventDispatcher();

  let formIsValid = false;

  const meetup = $meetups.find((m) => m.id === id);
  let title = meetup.title || "";
  let subtitle = meetup.subtitle || "";
  let address = meetup.address || "";
  let imageUrl = meetup.imageUrl || "";
  let contactEmail = meetup.contactEmail || "";
  let description = meetup.description || "";

  $: titleValid = !isEmpty(title);
  $: subtitleValid = !isEmpty(subtitle);
  $: addressValid = !isEmpty(address);
  $: imageUrlValid = !isEmpty(imageUrl);
  $: contactEmailValid = isValidEmail(contactEmail);
  $: descriptionValid = !isEmpty(description);

  $: formIsValid =
    titleValid &&
    subtitleValid &&
    addressValid &&
    imageUrlValid &&
    contactEmailValid &&
    descriptionValid;

  function submitForm() {
    const meetup = {
      contactEmail,
      title,
      subtitle,
      imageUrl,
      description,
      address,
    };

    if (id) {
      meetups.updateMeetup(id, meetup);
    } else {
      meetups.addMeetup(meetup);
    }
    dispatch("save");
  }
</script>

<style>
  form {
    width: 100%;
  }
</style>

<Modal title={id ? "Edit Meetup" : "New Meetup"} on:cancel>
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
      id="contactEmail"
      label="E-mail"
      type="email"
      value={contactEmail}
      valid={contactEmailValid}
      validityMessage="Please enter a valid e-mail."
      on:input={(event) => (contactEmail = event.target.value)}
    />
    <TextInput
      controlType="textarea"
      id="description"
      label="Description"
      valid={descriptionValid}
      validityMessage="Please enter a valid description."
      bind:value={description}
    />
  </form>
  <div slot="footer">
    <Button type="button" mode="outline" on:click={() => dispatch("cancel")}
      >Cancel</Button
    >
    <Button type="button" on:click={submitForm} disabled={!formIsValid}
      >Save</Button
    >
  </div>
</Modal>

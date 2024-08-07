"use client";

function SubmitButton(props: any) {
  return (
    <button
      type="submit"
      className="btn btn-primary btn-sm w-full mt-4 disabled:bg-accent disabled:text-accent-content text-white"
      disabled={props.isLoading}>
      {props.isLoading ? <span className="loading loading-bars loading-sm "></span> : props.text}
    </button>
  );
}

export default SubmitButton;

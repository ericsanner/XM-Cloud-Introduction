import React from 'react';
import {
  Image as JssImage,
  Link as JssLink,
  ImageField,
  Field,
  LinkField,
  Text,
  useSitecoreContext,
} from '@sitecore-jss/sitecore-jss-nextjs';

interface Fields {
  Image: ImageField;
  ImageCaption: Field<string>;
  TargetUrl: LinkField;
}

type LogoProps = {
  params: { [key: string]: string };
  fields: Fields;
};

const LogoDefault = (props: LogoProps): JSX.Element => (
  <div className={`component image ${props.params.styles}`.trimEnd()}>
    <div className="component-content">
      <span className="is-empty-hint">Logo</span>
    </div>
  </div>
);

export const Banner = (props: LogoProps): JSX.Element => {
  const { sitecoreContext } = useSitecoreContext();
  const isPageEditing = sitecoreContext.pageEditing;
  const classHeroBannerEmpty =
    isPageEditing && props.fields?.Image?.value?.class === 'scEmptyImage'
      ? 'hero-banner-empty'
      : '';
  const backgroundStyle = { backgroundImage: `url('${props?.fields?.Image?.value?.src}')` };
  const modifyImageProps = {
    ...props.fields.Image,
    editable: props?.fields?.Image?.editable
      ?.replace(`width="${props?.fields?.Image?.value?.width}"`, 'width="100%"')
      .replace(`height="${props?.fields?.Image?.value?.height}"`, 'height="100%"'),
  };
  const id = props.params.RenderingIdentifier;

  return (
    <div
      className={`component hero-banner ${props.params.styles} ${classHeroBannerEmpty}`}
      id={id ? id : undefined}
    >
      <div className="component-content sc-sxa-image-hero-banner" style={backgroundStyle}>
        {sitecoreContext.pageEditing ? <JssImage field={modifyImageProps} /> : ''}
      </div>
    </div>
  );
};

export const Default = (props: LogoProps): JSX.Element => {
  const { sitecoreContext } = useSitecoreContext();

  if (props.fields) {
    const Image = () => <JssImage field={props.fields.Image} />;
    const id = props.params.RenderingIdentifier;

    return (
      <div className={`component image ${props.params.styles}`} id={id ? id : undefined}>
        <div className="component-content">
          {sitecoreContext?.pageState === 'edit' || !props.fields.TargetUrl?.value?.href ? (
            <Image />
          ) : (
            <JssLink field={props.fields.TargetUrl}>
              <Image />
            </JssLink>
          )}
          <Text
            tag="span"
            className="image-caption field-imagecaption"
            field={props.fields.ImageCaption}
          />
        </div>
      </div>
    );
  }

  return <LogoDefault {...props} />;
};

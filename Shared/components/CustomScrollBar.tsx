import React, { forwardRef, Ref } from 'react';
import Scrollbars from 'react-custom-scrollbars-2';

export interface positionValues {
  top: number;
  left: number;
  clientWidth: number;
  clientHeight: number;
  scrollWidth: number;
  scrollHeight: number;
  scrollLeft: number;
  scrollTop: number;
}

interface IScrollbar {
  children?: React.ReactNode;
  style?: React.CSSProperties;
  autoHide?: boolean;
  autoHideTimeout?: number;
  autoHideDuration?: number;
  className?: string;
  containerClassName?: string;
  onScrollFrame?: (values?: positionValues) => void;
  onScrollCapture?: any;
  hideVertical?: boolean;
  hideHorizontal?: boolean;
}

const CustomScrollBar = forwardRef<Scrollbars, IScrollbar>(
  (props: IScrollbar, ref: Ref<Scrollbars>) => {
    const renderThumb = ({
      style,
      ...thumbProps
    }: {
      style?: React.CSSProperties;
      [key: string]: any;
    }) => {
      const thumbStyle = {
        backgroundColor: 'rgba(100, 100, 100, 0.5)',
        borderRadius: '4px',
      };
      return (
        <div
          className="renderThumb"
          style={{ ...style, ...thumbStyle }}
          {...thumbProps}
        />
      );
    };

    const renderTrack = ({
      style,
      ...trackProps
    }: {
      style?: React.CSSProperties;
      [key: string]: any;
    }) => {
      const trackStyle: React.CSSProperties = {
        position: 'absolute',
        width: '6px',
        right: '2px',
        bottom: '2px',
        top: '2px',
        borderRadius: '3px',
        backgroundColor: 'rgba(0, 0, 0, 0.1)',
      };
      return (
        <div
          className="renderTrack"
          style={{ ...style, ...trackStyle }}
          {...trackProps}
        />
      );
    };

    const renderView = ({
      style,
      ...viewProps
    }: {
      style?: React.CSSProperties;
      [key: string]: any;
    }) => {
      return (
        <div
          {...viewProps}
          style={{ ...style, paddingRight: 1 }}
          className={`view ${props?.className || ''}`}
        />
      );
    };

    const renderTrackHorizontal = ({
      style,
      ...trackProps
    }: {
      style?: React.CSSProperties;
      [key: string]: any;
    }) => {
      const trackStyle: React.CSSProperties = {
        position: 'absolute' as 'absolute',
        height: '6px',
        left: '2px',
        right: '2px',
        bottom: '2px',
        borderRadius: '3px',
        backgroundColor: 'rgba(0, 0, 0, 0.1)',
      };
      return (
        <div
          className="renderTrackHorizontal"
          style={{ ...style, ...trackStyle }}
          {...trackProps}
        />
      );
    };

    const renderThumbHorizontal = ({
      style,
      ...thumbProps
    }: {
      style?: React.CSSProperties;
      [key: string]: any;
    }) => {
      const thumbStyle = {
        backgroundColor: 'rgba(100, 100, 100, 0.5)',
        borderRadius: '4px',
      };
      return (
        <div
          className="renderThumbHorizontal"
          style={{ ...style, ...thumbStyle }}
          {...thumbProps}
        />
      );
    };

    return (
      <Scrollbars
        ref={ref}
        style={props?.style}
        renderView={renderView}
        renderThumbVertical={
          props?.hideVertical
            ? () => <div style={{ display: 'none' }} />
            : renderThumb
        }
        renderTrackVertical={
          props?.hideVertical
            ? () => <div style={{ display: 'none' }} />
            : renderTrack
        }
        renderTrackHorizontal={
          props?.hideHorizontal
            ? () => <div style={{ display: 'none' }} />
            : renderTrackHorizontal
        }
        renderThumbHorizontal={
          props?.hideHorizontal
            ? () => <div style={{ display: 'none' }} />
            : renderThumbHorizontal
        }
        className={`ScrollbarsSidebar ${props?.containerClassName || ''}`}
        autoHide={props?.autoHide}
        autoHideTimeout={props?.autoHideTimeout}
        autoHideDuration={props?.autoHideDuration}
        onScrollFrame={props?.onScrollFrame}
        onScrollCapture={props?.onScrollCapture}
      >
        {props?.children}
      </Scrollbars>
    );
  },
);

export default CustomScrollBar;
